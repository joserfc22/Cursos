(function () {
  function setText(id, value) {
    var element = document.getElementById(id);
    if (element) {
      element.textContent = value || '';
    }
  }

  function setLink(id, href, textId, textValue) {
    var link = document.getElementById(id);
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
    var link = document.getElementById(id);

    if (link && normalizedHref) {
      link.href = normalizedHref;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }

    if (textId) {
      setText(textId, textValue);
    }
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderList(containerId, items) {
    var container = document.getElementById(containerId);
    if (!container) {
      return;
    }

    container.innerHTML = '';
    (items || []).forEach(function (item) {
      var li = document.createElement('li');
      li.textContent = item;
      container.appendChild(li);
    });
  }

  function renderCards(cards) {
    var container = document.getElementById('courses-grid');
    var dataHelpers = window.HospitalCoursesData || {};
    if (!container) {
      return;
    }

    container.innerHTML = '';

    (cards || []).forEach(function (card) {
      var article = document.createElement('article');
      article.className = 'card';
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
        '    <a class="btn-inscricao" href="' + escapeHtml(card.buttonHref || '#contato') + '">' + escapeHtml(card.buttonText || 'Fazer minha inscricao') + '</a>',
        '    <a class="btn-info-curso" href="' + escapeHtml(card.infoHref || 'payment.html') + '">' + escapeHtml(card.infoText || 'Informacoes do curso') + '</a>',
        '  </div>',
        '</div>'
      ].join('');
      container.appendChild(article);
    });
  }

  function renderDifferentials(items) {
    var container = document.getElementById('differentials-grid');
    if (!container) {
      return;
    }

    container.innerHTML = '';

    (items || []).forEach(function (item) {
      var article = document.createElement('article');
      article.className = 'info-card';
      article.innerHTML = [
        '<div class="eyebrow">' + escapeHtml(item.eyebrow || '') + '</div>',
        '<h3>' + escapeHtml(item.title || '') + '</h3>',
        '<p>' + escapeHtml(item.text || '') + '</p>'
      ].join('');
      container.appendChild(article);
    });
  }

  function renderStats(cardsLength) {
    var container = document.getElementById('hero-stats');
    if (!container) {
      return;
    }

    container.innerHTML = [
      '<div>',
      '  <div class="stat-num">' + cardsLength + '</div>',
      '  <div class="stat-label">cursos em destaque</div>',
      '</div>'
    ].join('');
  }

  function renderPaymentMethods(items) {
    var container = document.getElementById('payment-methods');
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

  async function renderSite() {
    if (!window.HospitalCoursesData) {
      return;
    }

    var data = await window.HospitalCoursesData.loadSiteData();

    setText('topbar-address-text', data.topbar.address);
    setLink('topbar-phone-link', data.topbar.phoneHref, 'topbar-phone-text', data.topbar.phoneText);
    setWhatsAppLink('topbar-whatsapp-link', data.topbar.whatsappHref, 'topbar-whatsapp-text', data.topbar.whatsappText);

    setLink('nav-cta-link', data.nav.buttonHref, 'nav-cta-text', data.nav.buttonText);

    setText('hero-badge-text', data.hero.badge);
    setText('hero-title', data.hero.title);
    setText('hero-subtitle', data.hero.subtitle);
    setText('hero-alert-text', data.hero.alertText);
    setText('hero-panel-title', data.hero.reasonsTitle);
    renderList('hero-reasons', data.hero.reasons);
    setLink('hero-primary-link', data.hero.primaryButtonHref, 'hero-primary-text', data.hero.primaryButtonText);
    renderStats((data.cards || []).length);

    setText('courses-label', data.sections.coursesLabel);
    setText('courses-title', data.sections.coursesTitle);
    setText('courses-subtitle', data.sections.coursesSubtitle);
    renderCards(data.cards);

    setText('differentials-label', data.sections.differentialsLabel);
    setText('differentials-title', data.sections.differentialsTitle);
    setText('differentials-subtitle', data.sections.differentialsSubtitle);
    renderDifferentials(data.differentials);

    setText('payment-label', data.payment.label);
    setText('payment-title', data.payment.title);
    setText('payment-subtitle', data.payment.subtitle);
    renderPaymentMethods(data.payment.methods);
    setText('payment-certification-title', data.payment.certificationTitle);
    setText('payment-certification-text', data.payment.certificationText);

    setText('cta-title', data.cta.title);
    setText('cta-text', data.cta.text);
    setWhatsAppLink('cta-whatsapp-link', data.cta.whatsappHref, 'cta-whatsapp-text', data.cta.whatsappText);
    setLink('cta-phone-link', data.cta.phoneHref, 'cta-phone-text', data.cta.phoneText);

    setText('footer-description', data.footer.description);
    setLink('footer-email-primary-link', 'mailto:' + data.footer.emailPrimary, 'footer-email-primary-text', data.footer.emailPrimary);
    setLink('footer-email-secondary-link', 'mailto:' + data.footer.emailSecondary, 'footer-email-secondary-text', data.footer.emailSecondary);
    setLink('footer-phone-link', data.footer.phoneHref, 'footer-phone-text', data.footer.phoneText);
    setWhatsAppLink('footer-whatsapp-link', data.footer.whatsappHref, 'footer-whatsapp-text', data.footer.whatsappText);
    setText('footer-address-text', data.footer.address);
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderSite();
  });
})();
