(function () {
  if (!window.HospitalCoursesData) {
    return;
  }

  var helpers = window.HospitalCoursesData;
  var state = helpers.deepClone(helpers.DEFAULT_SITE_DATA);
  var isDirty = false;
  var isSavingSiteFile = false;
  var siteFileHandle = null;
  var currentSectionId = 'section-general';
  var sectionObserver = null;

  function byId(id) {
    return document.getElementById(id);
  }

  function setValue(id, value) {
    var element = byId(id);
    if (element) {
      element.value = value || '';
    }
  }

  function getValue(id) {
    var element = byId(id);
    return element ? element.value.trim() : '';
  }

  function arrayToLines(items) {
    return (items || []).join('\n');
  }

  function linesToArray(value) {
    return value
      .split(/\r?\n/)
      .map(function (item) { return item.trim(); })
      .filter(Boolean);
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function normalizePrimaryIcon(value, fallbackText) {
    if (helpers.normalizePrimaryMetaIcon) {
      return helpers.normalizePrimaryMetaIcon(value, fallbackText);
    }

    return 'value';
  }

  function getPrimaryIconSvg(value, fallbackText) {
    if (helpers.getPrimaryMetaIconSvg) {
      return helpers.getPrimaryMetaIconSvg(value, fallbackText);
    }

    return '';
  }

  function buildPrimaryIconOptions(card) {
    var selected = normalizePrimaryIcon(card.primaryIcon, card.primaryInfo);

    return [
      '<option value="value"' + (selected === 'value' ? ' selected' : '') + '>Valor</option>',
      '<option value="date"' + (selected === 'date' ? ' selected' : '') + '>Data</option>'
    ].join('');
  }

  function showStatus(message, type) {
    var box = byId('dashboard-status');
    if (!box) {
      return;
    }

    box.className = 'dashboard-status ' + (type || 'info');
    box.textContent = message;
  }

  function setSaveStateLabel(text) {
    var label = byId('save-state-label');
    if (label) {
      label.textContent = text;
    }
  }

  function setVisibleCardsCount(count) {
    var visibleCount = byId('cards-visible-count');
    if (visibleCount) {
      visibleCount.textContent = count;
    }
  }

  function setCurrentSection(sectionId) {
    var section = byId(sectionId);
    if (!section) {
      return;
    }

    currentSectionId = sectionId;

    var title = section.getAttribute('data-section-title') || 'Dashboard';
    var description = section.getAttribute('data-section-description') || '';
    var theme = section.getAttribute('data-theme') || 'general';
    var titleEl = byId('current-section-name');
    var descriptionEl = byId('current-section-description');
    var focusCard = document.querySelector('.dashboard-focus-card');

    if (titleEl) {
      titleEl.textContent = title;
    }
    if (descriptionEl) {
      descriptionEl.textContent = description;
    }
    if (focusCard) {
      focusCard.setAttribute('data-current-theme', theme);
    }

    document.querySelectorAll('.dashboard-section').forEach(function (item) {
      item.classList.toggle('is-current', item.id === sectionId);
    });

    document.querySelectorAll('[data-section-link]').forEach(function (link) {
      link.classList.toggle('is-active', link.getAttribute('data-section-link') === sectionId);
    });
  }

  function markDirty() {
    isDirty = true;
    setSaveStateLabel('Alteracoes pendentes');
    showStatus('Voce tem alteracoes nao salvas. Salve um rascunho ou atualize o index.html.', 'dirty');
  }

  function clearDirty(message, type) {
    isDirty = false;
    setSaveStateLabel('Tudo salvo');
    showStatus(message, type);
  }

  function buildEditorCardHeader(title, summary, index) {
    return [
      '<div class="editor-card-header-main">',
      '  <span class="editor-card-index">' + (index + 1) + '</span>',
      '  <div>',
      '    <h3>' + escapeHtml(title) + '</h3>',
      '    <p class="editor-card-summary">' + escapeHtml(summary) + '</p>',
      '  </div>',
      '</div>'
    ].join('');
  }

  function buildCardSummary(card) {
    var pieces = [card.tag, card.primaryInfo, card.secondaryInfo].filter(Boolean);
    return pieces.length ? pieces.join(' | ') : 'Preencha os dados para identificar este curso com facilidade.';
  }

  function buildCardEditor(card, index) {
    var title = card.title || 'Novo curso';
    return [
      '<article class="editor-card" data-index="' + index + '">',
      '  <div class="editor-card-header">',
      buildEditorCardHeader(title, buildCardSummary(card), index),
      '    <div class="editor-card-actions">',
      '      <button type="button" data-action="move-up">Subir</button>',
      '      <button type="button" data-action="move-down">Descer</button>',
      '      <button type="button" data-action="remove">Excluir</button>',
      '    </div>',
      '  </div>',
      '  <div class="dashboard-grid">',
      '    <label class="dashboard-field full"><span>URL da imagem</span><input data-key="image" type="text" value="' + escapeHtml(card.image) + '" placeholder="https://..."></label>',
      '    <label class="dashboard-field"><span>Alt da imagem</span><input data-key="imageAlt" type="text" value="' + escapeHtml(card.imageAlt) + '" placeholder="Descricao curta da imagem"></label>',
      '    <label class="dashboard-field"><span>Tag</span><input data-key="tag" type="text" value="' + escapeHtml(card.tag) + '" placeholder="Ex.: Curso presencial"></label>',
      '    <label class="dashboard-field"><span>Titulo do curso</span><input data-key="title" type="text" value="' + escapeHtml(card.title) + '" placeholder="Nome do curso"></label>',
      '    <label class="dashboard-field"><span>Informacao principal</span><input data-key="primaryInfo" type="text" value="' + escapeHtml(card.primaryInfo) + '" placeholder="Data, carga horaria ou destaque"></label>',
      '    <label class="dashboard-field"><span>Icone da informacao principal</span><select data-key="primaryIcon">' + buildPrimaryIconOptions(card) + '</select></label>',
      '    <label class="dashboard-field full"><span>Informacao secundaria</span><input data-key="secondaryInfo" type="text" value="' + escapeHtml(card.secondaryInfo) + '" placeholder="Local, publico ou observacao complementar"></label>',
      '    <label class="dashboard-field"><span>Texto do botao de inscricao</span><input data-key="buttonText" type="text" value="' + escapeHtml(card.buttonText) + '" placeholder="Ex.: Fazer minha inscricao"></label>',
      '    <label class="dashboard-field"><span>Link do botao de inscricao</span><input data-key="buttonHref" type="text" value="' + escapeHtml(card.buttonHref) + '" placeholder="https://... ou #contato"></label>',
      '    <label class="dashboard-field"><span>Texto do botao de informacoes</span><input data-key="infoText" type="text" value="' + escapeHtml(card.infoText) + '" placeholder="Ex.: Informacoes do curso"></label>',
      '    <label class="dashboard-field"><span>Link do botao de informacoes</span><input data-key="infoHref" type="text" value="' + escapeHtml(card.infoHref) + '" placeholder="#pagamento ou https://..."></label>',
      '  </div>',
      '</article>'
    ].join('');
  }

  function buildDifferentialSummary(item) {
    return item.text || 'Explique em uma frase curta o principal diferencial.';
  }

  function buildDifferentialEditor(item, index) {
    var title = item.title || 'Novo diferencial';
    return [
      '<article class="editor-card" data-index="' + index + '">',
      '  <div class="editor-card-header">',
      buildEditorCardHeader(title, buildDifferentialSummary(item), index),
      '    <div class="editor-card-actions">',
      '      <button type="button" data-action="move-up">Subir</button>',
      '      <button type="button" data-action="move-down">Descer</button>',
      '      <button type="button" data-action="remove">Excluir</button>',
      '    </div>',
      '  </div>',
      '  <div class="dashboard-grid">',
      '    <label class="dashboard-field"><span>Eyebrow</span><input data-key="eyebrow" type="text" value="' + escapeHtml(item.eyebrow) + '" placeholder="Ex.: Estrutura"></label>',
      '    <label class="dashboard-field"><span>Titulo</span><input data-key="title" type="text" value="' + escapeHtml(item.title) + '" placeholder="Titulo do diferencial"></label>',
      '    <label class="dashboard-field full"><span>Texto</span><textarea data-key="text" placeholder="Descreva em poucas linhas o que torna esse diferencial forte.">' + escapeHtml(item.text) + '</textarea></label>',
      '  </div>',
      '</article>'
    ].join('');
  }

  function renderCardsEditor() {
    var container = byId('cards-editor');
    if (!container) {
      return;
    }

    if (!state.cards.length) {
      container.innerHTML = '<div class="dashboard-section-tip"><strong>Nenhum card criado</strong><p>Clique em "Adicionar card" para montar a vitrine de cursos.</p></div>';
      updateCardSearchFeedback(0);
      return;
    }

    container.innerHTML = state.cards.map(buildCardEditor).join('');
    applyCardFilter();
  }

  function renderDifferentialsEditor() {
    var container = byId('differentials-editor');
    if (!container) {
      return;
    }

    if (!state.differentials.length) {
      container.innerHTML = '<div class="dashboard-section-tip"><strong>Nenhum diferencial criado</strong><p>Adicione blocos para reforcar autoridade, estrutura e metodologia.</p></div>';
      return;
    }

    container.innerHTML = state.differentials.map(buildDifferentialEditor).join('');
  }

  function syncCardsFromDom() {
    var items = [];
    document.querySelectorAll('#cards-editor .editor-card').forEach(function (cardEl) {
      var card = {};
      cardEl.querySelectorAll('[data-key]').forEach(function (field) {
        card[field.getAttribute('data-key')] = field.value.trim();
      });
      items.push(card);
    });
    state.cards = items;
  }

  function syncDifferentialsFromDom() {
    var items = [];
    document.querySelectorAll('#differentials-editor .editor-card').forEach(function (itemEl) {
      var item = {};
      itemEl.querySelectorAll('[data-key]').forEach(function (field) {
        item[field.getAttribute('data-key')] = field.value.trim();
      });
      items.push(item);
    });
    state.differentials = items;
  }

  function syncFormIntoState() {
    state.topbar.address = getValue('topbar-address');
    state.topbar.phoneText = getValue('topbar-phone-text-field');
    state.topbar.phoneHref = getValue('topbar-phone-href');
    state.topbar.whatsappText = getValue('topbar-whatsapp-text-field');
    state.topbar.whatsappHref = getValue('topbar-whatsapp-href');

    state.nav.buttonText = getValue('nav-button-text');
    state.nav.buttonHref = getValue('nav-button-href');

    state.hero.badge = getValue('hero-badge-field');
    state.hero.title = getValue('hero-title-field');
    state.hero.subtitle = getValue('hero-subtitle-field');
    state.hero.reasonsTitle = getValue('hero-reasons-title');
    state.hero.reasons = linesToArray(getValue('hero-reasons-field'));
    state.hero.primaryButtonText = getValue('hero-button-text');
    state.hero.primaryButtonHref = getValue('hero-button-href');

    state.sections.coursesLabel = getValue('courses-label-field');
    state.sections.coursesTitle = getValue('courses-title-field');
    state.sections.coursesSubtitle = getValue('courses-subtitle-field');
    state.sections.differentialsLabel = getValue('differentials-label-field');
    state.sections.differentialsTitle = getValue('differentials-title-field');
    state.sections.differentialsSubtitle = getValue('differentials-subtitle-field');

    state.cta.title = getValue('cta-title-field');
    state.cta.text = getValue('cta-text-field');
    state.cta.whatsappText = getValue('cta-whatsapp-text-field');
    state.cta.whatsappHref = getValue('cta-whatsapp-href');
    state.cta.phoneText = getValue('cta-phone-text-field');
    state.cta.phoneHref = getValue('cta-phone-href');

    state.footer.description = getValue('footer-description-field');
    state.footer.phoneText = getValue('footer-phone-text-field');
    state.footer.phoneHref = getValue('footer-phone-href');
    state.footer.whatsappText = getValue('footer-whatsapp-text-field');
    state.footer.whatsappHref = getValue('footer-whatsapp-href');
    state.footer.address = getValue('footer-address-field');

    syncCardsFromDom();
    syncDifferentialsFromDom();
  }

  function renderStaticFields() {
    setValue('topbar-address', state.topbar.address);
    setValue('topbar-phone-text-field', state.topbar.phoneText);
    setValue('topbar-phone-href', state.topbar.phoneHref);
    setValue('topbar-whatsapp-text-field', state.topbar.whatsappText);
    setValue('topbar-whatsapp-href', state.topbar.whatsappHref);

    setValue('nav-button-text', state.nav.buttonText);
    setValue('nav-button-href', state.nav.buttonHref);

    setValue('hero-badge-field', state.hero.badge);
    setValue('hero-title-field', state.hero.title);
    setValue('hero-subtitle-field', state.hero.subtitle);
    setValue('hero-reasons-title', state.hero.reasonsTitle);
    setValue('hero-reasons-field', arrayToLines(state.hero.reasons));
    setValue('hero-button-text', state.hero.primaryButtonText);
    setValue('hero-button-href', state.hero.primaryButtonHref);

    setValue('courses-label-field', state.sections.coursesLabel);
    setValue('courses-title-field', state.sections.coursesTitle);
    setValue('courses-subtitle-field', state.sections.coursesSubtitle);
    setValue('differentials-label-field', state.sections.differentialsLabel);
    setValue('differentials-title-field', state.sections.differentialsTitle);
    setValue('differentials-subtitle-field', state.sections.differentialsSubtitle);

    setValue('cta-title-field', state.cta.title);
    setValue('cta-text-field', state.cta.text);
    setValue('cta-whatsapp-text-field', state.cta.whatsappText);
    setValue('cta-whatsapp-href', state.cta.whatsappHref);
    setValue('cta-phone-text-field', state.cta.phoneText);
    setValue('cta-phone-href', state.cta.phoneHref);

    setValue('footer-description-field', state.footer.description);
    setValue('footer-phone-text-field', state.footer.phoneText);
    setValue('footer-phone-href', state.footer.phoneHref);
    setValue('footer-whatsapp-text-field', state.footer.whatsappText);
    setValue('footer-whatsapp-href', state.footer.whatsappHref);
    setValue('footer-address-field', state.footer.address);
  }

  function renderAll() {
    renderStaticFields();
    renderCardsEditor();
    renderDifferentialsEditor();
    renderSummary();
    renderCardsPreview();
    setCurrentSection(currentSectionId);
  }

  function updateCardSearchFeedback(visibleCount) {
    var result = byId('card-search-result');
    var total = state.cards.length;
    var search = byId('card-search');
    var hasTerm = !!(search && search.value.trim());

    setVisibleCardsCount(visibleCount);

    if (!result) {
      return;
    }

    if (!total) {
      result.textContent = 'Nenhum card cadastrado';
      return;
    }

    if (hasTerm) {
      result.textContent = 'Mostrando ' + visibleCount + ' de ' + total + ' cards';
      return;
    }

    result.textContent = 'Exibindo ' + total + ' cards';
  }

  function renderSummary() {
    var cardsCount = byId('summary-cards-count');
    var diffCount = byId('summary-differentials-count');
    var navText = byId('summary-nav-text');
    var heroBadge = byId('summary-hero-badge');
    var quickCards = byId('quicknav-cards-count');
    var quickDiffs = byId('quicknav-differentials-count');

    if (cardsCount) {
      cardsCount.textContent = state.cards.length;
    }
    if (diffCount) {
      diffCount.textContent = state.differentials.length;
    }
    if (navText) {
      navText.textContent = state.nav.buttonText || '-';
    }
    if (heroBadge) {
      heroBadge.textContent = state.hero.badge || '-';
    }
    if (quickCards) {
      quickCards.textContent = state.cards.length + (state.cards.length === 1 ? ' curso' : ' cursos');
    }
    if (quickDiffs) {
      quickDiffs.textContent = state.differentials.length + (state.differentials.length === 1 ? ' bloco' : ' blocos');
    }

    updateCardSearchFeedback(state.cards.length);
  }

  function buildPreviewCard(card) {
    return [
      '<article class="preview-card">',
      '  <div class="preview-card-image">',
      card.image ? '    <img src="' + escapeHtml(card.image) + '" alt="' + escapeHtml(card.imageAlt || card.title || 'Curso') + '">' : '',
      '  </div>',
      '  <div class="preview-card-body">',
      '    <span class="preview-card-tag">' + escapeHtml(card.tag || 'Curso') + '</span>',
      '    <div class="preview-card-title">' + escapeHtml(card.title || 'Sem titulo') + '</div>',
      '    <div class="preview-meta-row">' + getPrimaryIconSvg(card.primaryIcon, card.primaryInfo) + '<span class="preview-card-text">' + escapeHtml(card.primaryInfo || '') + '</span></div>',
      '    <div class="preview-meta-row"><svg class="preview-meta-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path><circle cx="12" cy="9" r="2.5"></circle></svg><span class="preview-card-text">' + escapeHtml(card.secondaryInfo || '') + '</span></div>',
      '  </div>',
      '</article>'
    ].join('');
  }

  function renderCardsPreview() {
    var preview = byId('cards-preview');
    if (!preview) {
      return;
    }

    if (!state.cards.length) {
      preview.innerHTML = '<div class="dashboard-section-tip"><strong>Previa vazia</strong><p>Assim que voce adicionar um card, a previa aparece aqui.</p></div>';
      return;
    }

    preview.innerHTML = state.cards.map(buildPreviewCard).join('');
  }

  function applyCardFilter() {
    var search = byId('card-search');
    if (!search) {
      return;
    }

    var term = search.value.trim().toLowerCase();
    var visibleCount = 0;

    document.querySelectorAll('#cards-editor .editor-card').forEach(function (cardEl) {
      var text = cardEl.textContent.toLowerCase();
      var isVisible = !term || text.indexOf(term) !== -1;

      cardEl.style.display = isVisible ? '' : 'none';
      cardEl.classList.toggle('is-highlighted', !!term && isVisible);

      if (isVisible) {
        visibleCount += 1;
      }
    });

    updateCardSearchFeedback(visibleCount);
  }

  function refreshEditorSnapshots() {
    document.querySelectorAll('#cards-editor .editor-card').forEach(function (cardEl, index) {
      var title = '';
      var summaryParts = [];
      var titleField = cardEl.querySelector('[data-key="title"]');
      var tagField = cardEl.querySelector('[data-key="tag"]');
      var primaryField = cardEl.querySelector('[data-key="primaryInfo"]');
      var secondaryField = cardEl.querySelector('[data-key="secondaryInfo"]');
      var titleEl = cardEl.querySelector('h3');
      var summaryEl = cardEl.querySelector('.editor-card-summary');
      var indexEl = cardEl.querySelector('.editor-card-index');

      title = titleField ? titleField.value.trim() : '';
      [tagField, primaryField, secondaryField].forEach(function (field) {
        if (field && field.value.trim()) {
          summaryParts.push(field.value.trim());
        }
      });

      if (titleEl) {
        titleEl.textContent = title || 'Novo curso';
      }
      if (summaryEl) {
        summaryEl.textContent = summaryParts.length ? summaryParts.join(' | ') : 'Preencha os dados para identificar este curso com facilidade.';
      }
      if (indexEl) {
        indexEl.textContent = index + 1;
      }
    });

    document.querySelectorAll('#differentials-editor .editor-card').forEach(function (itemEl, index) {
      var titleField = itemEl.querySelector('[data-key="title"]');
      var textField = itemEl.querySelector('[data-key="text"]');
      var titleEl = itemEl.querySelector('h3');
      var summaryEl = itemEl.querySelector('.editor-card-summary');
      var indexEl = itemEl.querySelector('.editor-card-index');

      if (titleEl) {
        titleEl.textContent = titleField && titleField.value.trim() ? titleField.value.trim() : 'Novo diferencial';
      }
      if (summaryEl) {
        summaryEl.textContent = textField && textField.value.trim() ? textField.value.trim() : 'Explique em uma frase curta o principal diferencial.';
      }
      if (indexEl) {
        indexEl.textContent = index + 1;
      }
    });
  }

  function handleLiveChange() {
    syncFormIntoState();
    renderSummary();
    renderCardsPreview();
    refreshEditorSnapshots();
    applyCardFilter();
    setCurrentSection(currentSectionId);
    markDirty();
  }

  function makeNewCard() {
    return {
      image: '',
      imageAlt: '',
      tag: 'Instituto de Ensino',
      title: 'Novo curso',
      primaryIcon: 'value',
      primaryInfo: 'Digite a data ou subtitulo',
      secondaryInfo: 'Hospital Ruy Azeredo - Goiania',
      buttonText: 'Fazer minha inscricao',
      buttonHref: '#contato',
      infoText: 'Informacoes do curso',
      infoHref: 'payment.html'
    };
  }

  function makeNewDifferential() {
    return {
      eyebrow: 'Novo diferencial',
      title: 'Titulo do diferencial',
      text: 'Descreva aqui o diferencial.'
    };
  }

  function moveItem(array, from, to) {
    if (to < 0 || to >= array.length) {
      return;
    }

    var item = array.splice(from, 1)[0];
    array.splice(to, 0, item);
  }

  function setSiteSaveState(active) {
    isSavingSiteFile = active;
    var button = byId('save-button');
    if (!button) {
      return;
    }

    button.disabled = active;
    button.textContent = active ? 'Atualizando index.html...' : 'Atualizar index.html';
  }

  async function saveSiteFile() {
    if (isSavingSiteFile) {
      return;
    }

    syncFormIntoState();
    helpers.saveDraftSiteData(state);
    setSiteSaveState(true);
    setSaveStateLabel('Salvando...');
    showStatus('Atualizando o index.html selecionado...', 'info');

    try {
      var result = await helpers.saveSiteHtmlFile(state, siteFileHandle);
      siteFileHandle = result.handle || siteFileHandle;

      if (result.method === 'overwrite' || result.method === 'filesystem') {
        clearDirty('index.html atualizado diretamente. Recarregue a pagina do site para ver o novo conteudo.', 'success');
      } else {
        clearDirty('O navegador nao permitiu editar o arquivo atual e baixou um novo index.html como alternativa.', 'warning');
      }
    } catch (error) {
      isDirty = true;
      setSaveStateLabel('Alteracoes pendentes');
      if (error && error.name === 'AbortError') {
        showStatus('Salvamento cancelado. O index.html nao foi alterado.', 'warning');
      } else {
        showStatus(error && error.message ? error.message : 'Falha ao salvar o index.html.', 'warning');
      }
    } finally {
      setSiteSaveState(false);
    }
  }

  function initializeSectionObserver() {
    var sections = Array.prototype.slice.call(document.querySelectorAll('.dashboard-section[id]'));

    if (!sections.length) {
      return;
    }

    if (sectionObserver) {
      sectionObserver.disconnect();
    }

    if (!('IntersectionObserver' in window)) {
      setCurrentSection(sections[0].id);
      return;
    }

    sectionObserver = new IntersectionObserver(function (entries) {
      var visibleEntries = entries
        .filter(function (entry) { return entry.isIntersecting; })
        .sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });

      if (visibleEntries.length) {
        setCurrentSection(visibleEntries[0].target.id);
      }
    }, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0.15
    });

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  byId('save-draft-button').addEventListener('click', function () {
    syncFormIntoState();
    helpers.saveDraftSiteData(state);
    renderSummary();
    renderCardsPreview();
    clearDirty('Rascunho salvo neste navegador. Quando quiser, gere o index.html atualizado.', 'success');
  });

  byId('save-button').addEventListener('click', function () {
    saveSiteFile();
  });

  byId('reset-button').addEventListener('click', async function () {
    helpers.clearDraftSiteData();
    setSaveStateLabel('Recarregando...');
    showStatus('Recarregando os dados atuais do index.html...', 'info');
    state = await helpers.loadSiteData({ allowDraft: false });
    renderAll();
    clearDirty('Dashboard sincronizado com o index.html atual.', 'warning');
  });

  byId('add-card-button').addEventListener('click', function () {
    syncFormIntoState();
    state.cards.push(makeNewCard());
    renderCardsEditor();
    renderSummary();
    renderCardsPreview();
    setCurrentSection('section-cards');
    markDirty();
  });

  byId('add-differential-button').addEventListener('click', function () {
    syncFormIntoState();
    state.differentials.push(makeNewDifferential());
    renderDifferentialsEditor();
    renderSummary();
    setCurrentSection('section-differentials');
    markDirty();
  });

  byId('cards-editor').addEventListener('click', function (event) {
    var action = event.target.getAttribute('data-action');
    if (!action) {
      return;
    }

    syncFormIntoState();
    var cardEl = event.target.closest('.editor-card');
    var index = Number(cardEl.getAttribute('data-index'));

    if (action === 'remove') {
      state.cards.splice(index, 1);
    }
    if (action === 'move-up') {
      moveItem(state.cards, index, index - 1);
    }
    if (action === 'move-down') {
      moveItem(state.cards, index, index + 1);
    }

    renderCardsEditor();
    renderSummary();
    renderCardsPreview();
    setCurrentSection('section-cards');
    markDirty();
  });

  byId('differentials-editor').addEventListener('click', function (event) {
    var action = event.target.getAttribute('data-action');
    if (!action) {
      return;
    }

    syncFormIntoState();
    var itemEl = event.target.closest('.editor-card');
    var index = Number(itemEl.getAttribute('data-index'));

    if (action === 'remove') {
      state.differentials.splice(index, 1);
    }
    if (action === 'move-up') {
      moveItem(state.differentials, index, index - 1);
    }
    if (action === 'move-down') {
      moveItem(state.differentials, index, index + 1);
    }

    renderDifferentialsEditor();
    renderSummary();
    setCurrentSection('section-differentials');
    markDirty();
  });

  byId('card-search').addEventListener('input', applyCardFilter);

  document.addEventListener('focusin', function (event) {
    var section = event.target.closest('.dashboard-section[id]');
    if (section) {
      setCurrentSection(section.id);
    }
  });

  document.addEventListener('input', function (event) {
    if (event.target.matches('input, textarea, select')) {
      handleLiveChange();
    }
  });

  document.addEventListener('change', function (event) {
    if (event.target.matches('select')) {
      handleLiveChange();
    }
  });

  document.querySelectorAll('[data-section-link]').forEach(function (link) {
    link.addEventListener('click', function () {
      var targetId = link.getAttribute('data-section-link');
      setCurrentSection(targetId);
    });
  });

  document.querySelectorAll('.section-toggle').forEach(function (button) {
    button.addEventListener('click', function () {
      var targetId = button.getAttribute('data-target');
      var section = byId(targetId);
      if (!section) {
        return;
      }

      section.classList.toggle('is-collapsed');
      button.textContent = section.classList.contains('is-collapsed') ? 'Expandir' : 'Recolher';
    });
  });

  async function initialize() {
    state = await helpers.loadSiteData({ allowDraft: true });
    renderAll();
    initializeSectionObserver();

    if (helpers.getDraftSiteData()) {
      setSaveStateLabel('Rascunho carregado');
      showStatus('Rascunho local carregado. Atualize o index.html quando quiser aplicar as alteracoes.', 'info');
      return;
    }

    setSaveStateLabel('Tudo salvo');
    showStatus('Conteudo carregado do index.html atual. Edite os campos e salve o arquivo local quando terminar.', 'info');
  }

  initialize();
})();
