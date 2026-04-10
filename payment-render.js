(function () {
  function byId(id) {
    return document.getElementById(id);
  }

  function setText(id, value) {
    var element = byId(id);
    if (element) {
      element.textContent = value || '';
    }
  }

  function setLink(id, href, textId, textValue) {
    var link = byId(id);
    if (link && href) {
      link.href = href;
    }
    if (textId) {
      setText(textId, textValue);
    }
  }

  function setWhatsAppLink(id, href, textId, textValue) {
    var helpers = window.HospitalCoursesData || {};
    var normalizedHref = helpers.normalizeWhatsAppHref ? helpers.normalizeWhatsAppHref(href) : href;
    var link = byId(id);

    if (link && normalizedHref) {
      link.href = normalizedHref;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }

    if (textId) {
      setText(textId, textValue);
    }
  }

  function getTextOrFallback(value, fallback) {
    return String(value || '').trim() || fallback || '';
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function slugify(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function resolveSiteHref(href) {
    if (!href) {
      return 'index.html#contato';
    }

    if (href.indexOf('#') === 0) {
      return 'index.html' + href;
    }

    return href;
  }

  function resolveEnrollmentHref(slug) {
    return 'payment.html' + (slug ? '?curso=' + encodeURIComponent(slug) : '') + '#payment-form';
  }

  function findSelectedCourse(cards, selectedSlug) {
    var selectedCourse = null;

    (cards || []).forEach(function (card) {
      if (selectedSlug && selectedSlug === slugify(card.title)) {
        selectedCourse = card;
      }
    });

    return selectedCourse;
  }

  function renderCourseCards(cards, selectedSlug, whatsappHref) {
    var container = byId('payment-courses-grid');
    var dataHelpers = window.HospitalCoursesData || {};
    var selectedCourse = findSelectedCourse(cards, selectedSlug);
    var resolvedWhatsAppHref = dataHelpers.normalizeWhatsAppHref ? dataHelpers.normalizeWhatsAppHref(whatsappHref) : whatsappHref;

    if (!container) {
      return selectedCourse;
    }

    container.innerHTML = '';

    (cards || []).forEach(function (card) {
      var slug = slugify(card.title);
      var isSelected = selectedSlug && selectedSlug === slug;
      var article = document.createElement('article');

      article.className = 'card' + (isSelected ? ' is-selected' : '');
      article.id = 'curso-' + slug;
      article.innerHTML = [
        '<div class="card-img">',
        '  <img src="' + escapeHtml(card.image) + '" alt="' + escapeHtml(card.imageAlt || card.title || 'Curso') + '">',
        '  <span class="card-tag">' + escapeHtml(card.tag || '') + '</span>',
        '</div>',
        '<div class="card-body">',
        '  <p class="card-title">' + escapeHtml(card.title || '') + '</p>',
        '  <div class="card-meta">',
        '    <div class="meta-row">',
        '      ' + (dataHelpers.getPrimaryMetaIconSvg ? dataHelpers.getPrimaryMetaIconSvg(card.primaryIcon, card.primaryInfo) : ''),
        '      ' + escapeHtml(card.primaryInfo || ''),
        '    </div>',
        '    <div class="meta-row">',
        '      <svg class="meta-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path><circle cx="12" cy="9" r="2.5"></circle></svg>',
        '      ' + escapeHtml(card.secondaryInfo || ''),
        '    </div>',
        '  </div>',
        '  <div class="card-actions">',
        '    <a class="btn-inscricao" href="' + escapeHtml(resolveEnrollmentHref(slug)) + '">' + escapeHtml(card.buttonText || 'Fazer minha inscricao') + '</a>',
        '    <a class="btn-info-curso" href="' + escapeHtml(resolvedWhatsAppHref || resolveSiteHref(card.buttonHref)) + '"' + (resolvedWhatsAppHref ? ' target="_blank" rel="noopener noreferrer"' : '') + '>Tirar duvidas no WhatsApp</a>',
        '  </div>',
        '</div>'
      ].join('');

      container.appendChild(article);
    });

    return selectedCourse;
  }

  function renderPaymentMethods(items) {
    var container = byId('payment-methods');
    if (!container) {
      return;
    }

    container.innerHTML = '';

    (items || []).forEach(function (item) {
      var article = document.createElement('article');
      article.className = 'info-card payment-card';
      article.innerHTML = [
        '<div class="eyebrow">' + escapeHtml(item.eyebrow || '') + '</div>',
        '<h3>' + escapeHtml(item.title || '') + '</h3>',
        '<p>' + escapeHtml(item.text || '') + '</p>'
      ].join('');
      container.appendChild(article);
    });
  }

  function updateSelectedCourse(copy) {
    setText('selected-course-title', copy.title);
    setText('selected-course-description', copy.description);
  }

  function updateFormCourse(selectedCourse) {
    var courseField = byId('course-selected-input');

    if (selectedCourse) {
      setText('payment-form-course-text', selectedCourse.title);

      if (courseField) {
        courseField.value = selectedCourse.title;
      }

      return;
    }

    setText('payment-form-course-text', 'Abra esta pagina a partir do curso escolhido na pagina inicial para preencher a inscricao corretamente.');

    if (courseField) {
      courseField.value = '';
    }
  }

  function bindEnrollmentForm(selectedCourse) {
    var form = byId('enrollment-form');
    var feedback = byId('enrollment-form-feedback');
    var fileInput = byId('payment-proof');
    var fileText = byId('payment-proof-text');
    var preview = byId('payment-proof-preview');
    var previewImage = byId('payment-proof-image');
    var previewText = byId('payment-proof-preview-text');
    var subjectInput = byId('form-subject-input');
    var submitButton = form ? form.querySelector('.form-submit') : null;
    var fullNameInput = byId('full-name');
    var phoneInput = byId('phone-number');
    var cpfInput = byId('cpf-number');
    var birthDayInput = byId('birth-day');
    var birthYearInput = byId('birth-year');
    var addressInput = byId('address-line');
    var addressComplementInput = byId('address-complement');
    var cityInput = byId('city-name');
    var postalCodeInput = byId('postal-code');
    var postalCodeFeedback = byId('postal-code-feedback');
    var graduationInput = byId('graduation');
    var previewUrl = '';
    var lastFetchedCep = '';

    function keepLetters(value, allowNumbers) {
      var pattern = allowNumbers ? /[^0-9A-Za-zÀ-ÿ' .,-]/g : /[^A-Za-zÀ-ÿ' ]/g;
      return String(value || '').replace(pattern, '').replace(/\s{2,}/g, ' ');
    }

    function keepDigits(value) {
      return String(value || '').replace(/\D/g, '');
    }

    function formatCpf(value) {
      var digits = keepDigits(value).slice(0, 11);
      return digits
        .replace(/^(\d{3})(\d)/, '$1.$2')
        .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1-$2');
    }

    function formatPhone(value) {
      var digits = keepDigits(value).slice(0, 11);

      if (digits.length <= 2) {
        return digits ? '(' + digits : '';
      }

      if (digits.length <= 6) {
        return '(' + digits.slice(0, 2) + ') ' + digits.slice(2);
      }

      if (digits.length <= 10) {
        return '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 6) + '-' + digits.slice(6);
      }

      return '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 7) + '-' + digits.slice(7);
    }

    function formatCep(value) {
      var digits = keepDigits(value).slice(0, 8);
      return digits.length > 5 ? digits.slice(0, 5) + '-' + digits.slice(5) : digits;
    }

    function limitDay(value) {
      return keepDigits(value).slice(0, 2);
    }

    function limitYear(value) {
      return keepDigits(value).slice(0, 4);
    }

    function setPostalCodeFeedback(message, type) {
      if (!postalCodeFeedback) {
        return;
      }

      postalCodeFeedback.textContent = message || '';
      postalCodeFeedback.className = 'field-feedback' + (type ? ' is-' + type : '');
    }

    async function lookupPostalCode() {
      var cepDigits;

      if (!postalCodeInput) {
        return;
      }

      cepDigits = keepDigits(postalCodeInput.value);

      if (cepDigits.length < 8) {
        if (lastFetchedCep !== cepDigits) {
          setPostalCodeFeedback('', '');
        }
        return;
      }

      if (cepDigits === lastFetchedCep) {
        return;
      }

      lastFetchedCep = cepDigits;
      setPostalCodeFeedback('Buscando endereco pelo CEP...', 'info');

      try {
        var response = await fetch('https://viacep.com.br/ws/' + cepDigits + '/json/');
        var data;

        if (!response.ok) {
          throw new Error('Falha ao consultar o CEP.');
        }

        data = await response.json();

        if (data.erro) {
          setPostalCodeFeedback('CEP nao encontrado. Confira os numeros digitados.', 'error');
          return;
        }

        if (addressInput && data.logradouro && !addressInput.value.trim()) {
          addressInput.value = data.logradouro;
        }

        if (cityInput && data.localidade) {
          cityInput.value = data.localidade;
        }

        if (addressComplementInput && !addressComplementInput.value.trim()) {
          addressComplementInput.value = data.complemento || '';
        }

        setPostalCodeFeedback(
          [data.bairro, data.localidade, data.uf].filter(Boolean).join(' - '),
          'success'
        );
      } catch (error) {
        setPostalCodeFeedback('Nao foi possivel consultar o CEP agora. Voce pode preencher o endereco manualmente.', 'error');
      }
    }

    function resetPreview() {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        previewUrl = '';
      }

      if (previewImage) {
        previewImage.hidden = true;
        previewImage.removeAttribute('src');
      }

      if (previewText) {
        previewText.textContent = '';
      }

      if (preview) {
        preview.hidden = true;
      }
    }

    updateFormCourse(selectedCourse);

    if (fullNameInput) {
      fullNameInput.addEventListener('input', function () {
        fullNameInput.value = keepLetters(fullNameInput.value, false);
      });
    }

    if (phoneInput) {
      phoneInput.addEventListener('input', function () {
        phoneInput.value = formatPhone(phoneInput.value);
      });
    }

    if (cpfInput) {
      cpfInput.addEventListener('input', function () {
        cpfInput.value = formatCpf(cpfInput.value);
      });
    }

    if (birthDayInput) {
      birthDayInput.addEventListener('input', function () {
        birthDayInput.value = limitDay(birthDayInput.value);
      });
    }

    if (birthYearInput) {
      birthYearInput.addEventListener('input', function () {
        birthYearInput.value = limitYear(birthYearInput.value);
      });
    }

    if (cityInput) {
      cityInput.addEventListener('input', function () {
        cityInput.value = keepLetters(cityInput.value, false);
      });
    }

    if (postalCodeInput) {
      postalCodeInput.addEventListener('input', function () {
        postalCodeInput.value = formatCep(postalCodeInput.value);
        if (keepDigits(postalCodeInput.value).length < 8) {
          lastFetchedCep = '';
        }
        if (keepDigits(postalCodeInput.value).length === 8) {
          lookupPostalCode();
        }
      });

      postalCodeInput.addEventListener('blur', function () {
        lookupPostalCode();
      });
    }

    if (graduationInput) {
      graduationInput.addEventListener('input', function () {
        graduationInput.value = keepLetters(graduationInput.value, true);
      });
    }

    if (fileInput && fileText) {
      fileInput.addEventListener('change', function () {
        var file = fileInput.files && fileInput.files[0];

        fileText.textContent = file ? file.name : 'Enviar arquivos';

        if (!file) {
          resetPreview();
          return;
        }

        if (!preview || !previewImage || !previewText) {
          return;
        }

        preview.hidden = false;

        if (file.type && file.type.indexOf('image/') === 0) {
          resetPreview();
          previewUrl = URL.createObjectURL(file);
          preview.hidden = false;
          previewImage.src = previewUrl;
          previewImage.hidden = false;
          previewText.textContent = 'Previa do comprovante selecionado.';
          return;
        }

        previewImage.hidden = true;
        previewImage.removeAttribute('src');
        previewText.textContent = 'Arquivo selecionado: ' + file.name;
      });
    }

    if (!form || !feedback) {
      return;
    }

    form.addEventListener('submit', function (event) {
      feedback.className = 'form-feedback';

      if (!selectedCourse) {
        event.preventDefault();
        feedback.textContent = 'Abra esta pagina pelo botao do curso desejado para identificar corretamente a inscricao.';
        feedback.classList.add('is-error');
        return;
      }

      if (!form.checkValidity()) {
        event.preventDefault();
        form.reportValidity();
        feedback.textContent = 'Preencha os campos obrigatorios antes de enviar.';
        feedback.classList.add('is-error');
        return;
      }

      if (subjectInput) {
        subjectInput.value = 'Nova inscricao - ' + selectedCourse.title;
      }

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
      }

      feedback.textContent = 'Enviando inscricao e comprovante para a equipe...';
      feedback.classList.add('is-success');
    });
  }

  async function renderPaymentPage() {
    if (!window.HospitalCoursesData) {
      return;
    }

    var params = new URLSearchParams(window.location.search);
    var selectedSlug = params.get('curso') || '';
    var data = await window.HospitalCoursesData.loadSiteData();
    var baseData = window.HospitalCoursesData.DEFAULT_SITE_DATA || {};
    var selectedCourse;

    setText('topbar-address-text', data.topbar.address);
    setLink('topbar-phone-link', data.topbar.phoneHref, 'topbar-phone-text', data.topbar.phoneText);
    setWhatsAppLink('topbar-whatsapp-link', data.topbar.whatsappHref, 'topbar-whatsapp-text', data.topbar.whatsappText);

    setText('payment-hero-alert', getTextOrFallback(data.hero.alertText, baseData.hero && baseData.hero.alertText));
    setText('payment-label', getTextOrFallback(data.payment.label, baseData.payment && baseData.payment.label));
    setText('payment-title', getTextOrFallback(data.payment.title, baseData.payment && baseData.payment.title));
    setText('payment-subtitle', getTextOrFallback(data.payment.subtitle, baseData.payment && baseData.payment.subtitle));
    setText('payment-certification-title', getTextOrFallback(data.payment.certificationTitle, baseData.payment && baseData.payment.certificationTitle));
    setText('payment-certification-text', getTextOrFallback(data.payment.certificationText, baseData.payment && baseData.payment.certificationText));
    setText('footer-description', data.footer.description);
    setLink('footer-phone-link', data.footer.phoneHref, 'footer-phone-text', data.footer.phoneText);
    setWhatsAppLink('footer-whatsapp-link', data.footer.whatsappHref, 'footer-whatsapp-text', data.footer.whatsappText);
    setText('footer-address-text', data.footer.address);
    setWhatsAppLink('cta-whatsapp-link', data.cta.whatsappHref, 'cta-whatsapp-text', data.cta.whatsappText);
    setLink('cta-phone-link', data.cta.phoneHref, 'cta-phone-text', data.cta.phoneText);

    selectedCourse = renderCourseCards(data.cards, selectedSlug, data.topbar.whatsappHref);
    renderPaymentMethods((data.payment.methods && data.payment.methods.length ? data.payment.methods : (baseData.payment && baseData.payment.methods)) || []);
    bindEnrollmentForm(selectedCourse);

    if (selectedCourse) {
      document.title = selectedCourse.title + ' | Pagamento';
      setText('payment-hero-title', selectedCourse.title + ': pagamento e informacoes');
      setText('payment-hero-subtitle', 'Veja o valor informado, consulte as formas de pagamento aceitas e finalize sua inscricao com apoio da equipe.');
      updateSelectedCourse({
        title: selectedCourse.title,
        description: (selectedCourse.primaryInfo || '') + (selectedCourse.secondaryInfo ? ' | ' + selectedCourse.secondaryInfo : '')
      });
      return;
    }

    updateSelectedCourse({
      title: 'Selecione um curso na pagina inicial',
      description: 'Abra esta pagina a partir do card do curso na pagina inicial para identificar corretamente a inscricao.'
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderPaymentPage();
  });
})();
