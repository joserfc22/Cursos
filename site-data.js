(function () {
  var DRAFT_STORAGE_KEY = 'hospitalRuyAzeredoCoursesSiteDraftData';
  var SITE_FILE_NAME = 'index.html';

  var DEFAULT_SITE_DATA = {
    topbar: {
      address: 'R. Paissandu, 220 - Ipiranga, Goiania - GO',
      phoneText: '(62) 99904-0297',
      phoneHref: 'tel:+5562999040297',
      whatsappText: 'WhatsApp',
      whatsappHref: 'https://wa.me/5562999040297'
    },
    nav: {
      buttonText: 'Quero me inscrever',
      buttonHref: '#contato'
    },
    hero: {
      badge: 'Instituto de Ensino Ruy Azeredo',
      title: 'Cursos com teoria e pratica para medicos e academicos de medicina.',
      subtitle: 'Treinamentos pensados para ampliar conhecimentos com vivencia pratica, acompanhamento proximo e estrutura preparada para aulas aplicadas.',
      alertText: 'Vagas limitadas. Reserve seu lugar e amplie seus conhecimentos com palestrantes de referencia em Goias.',
      reasonsTitle: 'O que voce encontra aqui',
      reasons: [
        'Conteudo com teoria e pratica para ampliar seus conhecimentos.',
        'Aulas praticas realizadas em ambiente preparado, conforme o curso.',
        'Certificacao presencial com destaque institucional no auditorio HRA.'
      ],
      primaryButtonText: 'Ver cursos e valores',
      primaryButtonHref: '#turmas'
    },
    sections: {
      coursesLabel: 'Cursos em destaque',
      coursesTitle: 'Turmas e valores',
      coursesSubtitle: 'Confira os cursos solicitados, com informacoes de valor, formato e publico indicado.',
      differentialsLabel: 'Diferenciais',
      differentialsTitle: 'Aprendizado com foco pratico',
      differentialsSubtitle: 'Os cursos combinam acompanhamento, aplicacao pratica e contato direto para quem deseja evoluir com mais seguranca.'
    },
    cards: [
      {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVaHandJkje5urzw1aC5ku_hCu_QLWN52Hqw&s',
        imageAlt: 'Curso Botox Medico',
        tag: 'Teoria e pratica',
        title: 'Curso Botox Medico',
        primaryIcon: 'value',
        primaryInfo: 'Medicos: R$ 1.500 | Academicos de medicina: R$ 1.000',
        secondaryInfo: 'Instituto de Ensino Ruy Azeredo',
        buttonText: 'Fazer minha inscricao',
        buttonHref: 'payment.html?curso=curso-botox-medico',
        infoText: 'Informacoes do curso',
        infoHref: 'payment.html?curso=curso-botox-medico'
      },
      {
        image: 'https://static.wixstatic.com/media/428bd1_5d111414ddd5417db6fb870f65f85735~mv2.avif',
        imageAlt: 'Acesso Venoso Central Guiado por Ultrassom',
        tag: 'Teoria e pratica',
        title: 'Acesso Venoso Central Guiado por Ultrassom',
        primaryIcon: 'value',
        primaryInfo: 'Valor: R$ 1.399',
        secondaryInfo: 'Instituto de Ensino Ruy Azeredo',
        buttonText: 'Fazer minha inscricao',
        buttonHref: 'payment.html?curso=acesso-venoso-central-guiado-por-ultrassom',
        infoText: 'Informacoes do curso',
        infoHref: 'payment.html?curso=acesso-venoso-central-guiado-por-ultrassom'
      },
      {
        image: 'https://static.wixstatic.com/media/428bd1_9a1489bc38a04292a713a0c24bb97501~mv2.jpg',
        imageAlt: 'Dreno Toracico e Acesso Venoso Central',
        tag: 'Aula pratica',
        title: 'Dreno Toracico e Acesso Venoso Central',
        primaryIcon: 'value',
        primaryInfo: 'Valor: R$ 1.590',
        secondaryInfo: 'Aula pratica realizada no centro cirurgico',
        buttonText: 'Fazer minha inscricao',
        buttonHref: 'payment.html?curso=dreno-toracico-e-acesso-venoso-central',
        infoText: 'Informacoes do curso',
        infoHref: 'payment.html?curso=dreno-toracico-e-acesso-venoso-central'
      }
    ],
    differentials: [
      {
        eyebrow: 'Teoria e pratica',
        title: 'Conteudo aplicado',
        text: 'Turmas desenhadas para unir base tecnica, orientacao clara e execucao supervisionada.'
      },
      {
        eyebrow: 'Estrutura',
        title: 'Ambiente preparado',
        text: 'Aulas praticas realizadas em ambiente adequado, incluindo centro cirurgico quando previsto no curso.'
      },
      {
        eyebrow: 'Certificacao',
        title: 'Reconhecimento presencial',
        text: 'Formacao com destaque para a certificacao presencial em auditorio HRA.'
      }
    ],
    payment: {
      label: 'Pagamento e certificacao',
      title: 'Escolha a melhor forma de confirmar sua vaga',
      subtitle: 'Adicionamos uma area clara para pagamento e colocamos em destaque a certificacao presencial em auditorio HRA.',
      methods: [
        {
          eyebrow: 'Pix',
          title: 'Pagamento rapido',
          text: 'Ideal para confirmar a inscricao com agilidade e receber orientacoes logo em seguida.'
        },
        {
          eyebrow: 'Cartao de debito',
          title: 'Confirmacao direta',
          text: 'Opcao para pagamento a vista com praticidade no atendimento.'
        },
        {
          eyebrow: 'Cartao de credito',
          title: 'Parcelamento em 2x',
          text: 'Forma de pagamento em ate 2x para facilitar a confirmacao da vaga.'
        }
      ],
      certificationTitle: 'Certificacao presencial no auditorio HRA',
      certificationText: 'Esse destaque reforca a experiencia presencial e o valor institucional do treinamento.'
    },
    cta: {
      title: 'Quer reservar sua vaga ou tirar uma duvida?',
      text: 'Fale com a equipe para confirmar disponibilidade e receber orientacao sobre o curso ideal para voce.',
      whatsappText: 'WhatsApp (62) 99904-0297',
      whatsappHref: 'https://wa.me/5562999040297',
      phoneText: 'Ligar (62) 99904-0297',
      phoneHref: 'tel:+5562999040297'
    },
    footer: {
      description: 'Instituto de ensino com cursos voltados para pratica medica, acompanhamento proximo e aprendizado aplicado.',
      emailPrimary: 'institutodeensinoruyazeredo@gmail.com',
      emailSecondary: '',
      phoneText: '(62) 99904-0297',
      phoneHref: 'tel:+5562999040297',
      whatsappText: '(62) 99904-0297',
      whatsappHref: 'https://wa.me/5562999040297',
      address: 'R. Paissandu, 220 - Ipiranga, Goiania'
    }
  };

  function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function isPlainObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
  }

  function mergeDeep(base, override) {
    if (Array.isArray(base)) {
      return Array.isArray(override) ? override : deepClone(base);
    }

    if (!isPlainObject(base)) {
      return override === undefined ? base : override;
    }

    var output = {};
    Object.keys(base).forEach(function (key) {
      if (override && Object.prototype.hasOwnProperty.call(override, key)) {
        output[key] = mergeDeep(base[key], override[key]);
      } else {
        output[key] = deepClone(base[key]);
      }
    });
    return output;
  }

  function normalizeText(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function normalizeDigits(value) {
    return String(value || '').replace(/\D/g, '');
  }

  function normalizeWhatsAppHref(value) {
    var raw = normalizeText(value);
    var digits = '';
    var url;

    if (!raw) {
      return '';
    }

    if (/^\+?[\d\s().-]+$/.test(raw)) {
      digits = normalizeDigits(raw);
      return digits ? 'https://wa.me/' + digits : '';
    }

    if (/^wa\.me\//i.test(raw)) {
      raw = 'https://' + raw;
    }

    if (!/^https?:\/\//i.test(raw)) {
      return raw;
    }

    try {
      url = new window.URL(raw, window.location.href);
    } catch (error) {
      return raw;
    }

    if (/(\.|^)wa\.me$/i.test(url.hostname)) {
      digits = normalizeDigits(url.pathname);
      return digits ? 'https://wa.me/' + digits : raw;
    }

    if (/(\.|^)api\.whatsapp\.com$/i.test(url.hostname) || /(\.|^)web\.whatsapp\.com$/i.test(url.hostname)) {
      digits = normalizeDigits(url.searchParams.get('phone') || url.pathname);
      return digits ? 'https://wa.me/' + digits : raw;
    }

    return raw;
  }

  function normalizeMapHref(value) {
    var text = normalizeText(value);

    if (!text) {
      return '#';
    }

    return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(text);
  }

  function normalizeSiteLinks(data) {
    var site = deepClone(data || {});

    if (site.topbar) {
      site.topbar.whatsappHref = normalizeWhatsAppHref(site.topbar.whatsappHref);
    }

    if (site.cta) {
      site.cta.whatsappHref = normalizeWhatsAppHref(site.cta.whatsappHref);
    }

    if (site.footer) {
      site.footer.whatsappHref = normalizeWhatsAppHref(site.footer.whatsappHref);
    }

    return site;
  }

  function mergeWithDefaults(data) {
    return normalizeSiteLinks(mergeDeep(DEFAULT_SITE_DATA, data || {}));
  }

  function buildNoCachePath(path) {
    return path + '?v=' + Date.now();
  }

  function getTextById(doc, id) {
    var element = doc.getElementById(id);
    return element ? normalizeText(element.textContent) : '';
  }

  function getHrefById(doc, id) {
    var element = doc.getElementById(id);
    return element ? (element.getAttribute('href') || '').trim() : '';
  }

  function getTextWithoutSvg(element) {
    if (!element) {
      return '';
    }

    var clone = element.cloneNode(true);
    clone.querySelectorAll('svg').forEach(function (svg) {
      svg.remove();
    });
    return normalizeText(clone.textContent);
  }

  function parseSiteHtml(html) {
    var parser = new window.DOMParser();
    var doc = parser.parseFromString(html, 'text/html');
    var data = {
      topbar: {
        address: getTextById(doc, 'topbar-address-text'),
        phoneText: getTextById(doc, 'topbar-phone-text'),
        phoneHref: getHrefById(doc, 'topbar-phone-link'),
        whatsappText: getTextById(doc, 'topbar-whatsapp-text'),
        whatsappHref: getHrefById(doc, 'topbar-whatsapp-link')
      },
      nav: {
        buttonText: getTextById(doc, 'nav-cta-text'),
        buttonHref: getHrefById(doc, 'nav-cta-link')
      },
      hero: {
        badge: getTextById(doc, 'hero-badge-text'),
        title: getTextById(doc, 'hero-title'),
        subtitle: getTextById(doc, 'hero-subtitle'),
        alertText: getTextById(doc, 'hero-alert-text'),
        reasonsTitle: getTextById(doc, 'hero-panel-title'),
        reasons: Array.prototype.map.call(doc.querySelectorAll('#hero-reasons li'), function (item) {
          return normalizeText(item.textContent);
        }).filter(Boolean),
        primaryButtonText: getTextById(doc, 'hero-primary-text'),
        primaryButtonHref: getHrefById(doc, 'hero-primary-link')
      },
      sections: {
        coursesLabel: getTextById(doc, 'courses-label'),
        coursesTitle: getTextById(doc, 'courses-title'),
        coursesSubtitle: getTextById(doc, 'courses-subtitle'),
        differentialsLabel: getTextById(doc, 'differentials-label'),
        differentialsTitle: getTextById(doc, 'differentials-title'),
        differentialsSubtitle: getTextById(doc, 'differentials-subtitle')
      },
      cards: Array.prototype.map.call(doc.querySelectorAll('#courses-grid .card'), function (cardEl) {
        var metaRows = cardEl.querySelectorAll('.meta-row');
        var image = cardEl.querySelector('.card-img img');

        return {
          image: image ? (image.getAttribute('src') || '').trim() : '',
          imageAlt: image ? normalizeText(image.getAttribute('alt')) : '',
          tag: normalizeText((cardEl.querySelector('.card-tag') || {}).textContent),
          title: normalizeText((cardEl.querySelector('.card-title') || {}).textContent),
          primaryInfo: getTextWithoutSvg(metaRows[0]),
          secondaryInfo: getTextWithoutSvg(metaRows[1]),
          buttonText: normalizeText((cardEl.querySelector('.btn-inscricao') || {}).textContent),
          buttonHref: ((cardEl.querySelector('.btn-inscricao') || {}).getAttribute ? cardEl.querySelector('.btn-inscricao').getAttribute('href') : '') || '',
          infoText: normalizeText((cardEl.querySelector('.btn-info-curso') || {}).textContent),
          infoHref: ((cardEl.querySelector('.btn-info-curso') || {}).getAttribute ? cardEl.querySelector('.btn-info-curso').getAttribute('href') : '') || ''
        };
      }).filter(function (item) {
        return item.title || item.image || item.buttonHref;
      }),
      differentials: Array.prototype.map.call(doc.querySelectorAll('#differentials-grid .info-card'), function (itemEl) {
        return {
          eyebrow: normalizeText((itemEl.querySelector('.eyebrow') || {}).textContent),
          title: normalizeText((itemEl.querySelector('h3') || {}).textContent),
          text: normalizeText((itemEl.querySelector('p') || {}).textContent)
        };
      }).filter(function (item) {
        return item.title || item.text;
      }),
      payment: {
        label: getTextById(doc, 'payment-label'),
        title: getTextById(doc, 'payment-title'),
        subtitle: getTextById(doc, 'payment-subtitle'),
        methods: Array.prototype.map.call(doc.querySelectorAll('#payment-methods .info-card'), function (itemEl) {
          return {
            eyebrow: normalizeText((itemEl.querySelector('.eyebrow') || {}).textContent),
            title: normalizeText((itemEl.querySelector('h3') || {}).textContent),
            text: normalizeText((itemEl.querySelector('p') || {}).textContent)
          };
        }).filter(function (item) {
          return item.title || item.text;
        }),
        certificationTitle: getTextById(doc, 'payment-certification-title'),
        certificationText: getTextById(doc, 'payment-certification-text')
      },
      cta: {
        title: getTextById(doc, 'cta-title'),
        text: getTextById(doc, 'cta-text'),
        whatsappText: getTextById(doc, 'cta-whatsapp-text'),
        whatsappHref: getHrefById(doc, 'cta-whatsapp-link'),
        phoneText: getTextById(doc, 'cta-phone-text'),
        phoneHref: getHrefById(doc, 'cta-phone-link')
      },
      footer: {
        description: getTextById(doc, 'footer-description'),
        emailPrimary: getTextById(doc, 'footer-email-primary-text'),
        emailSecondary: getTextById(doc, 'footer-email-secondary-text'),
        phoneText: getTextById(doc, 'footer-phone-text'),
        phoneHref: getHrefById(doc, 'footer-phone-link'),
        whatsappText: getTextById(doc, 'footer-whatsapp-text'),
        whatsappHref: getHrefById(doc, 'footer-whatsapp-link'),
        address: getTextById(doc, 'footer-address-text')
      }
    };

    return mergeWithDefaults(data);
  }

  async function loadSiteHtmlData() {
    var response = await window.fetch(buildNoCachePath(SITE_FILE_NAME), {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Nao foi possivel carregar o index.html atual.');
    }

    return parseSiteHtml(await response.text());
  }

  function getDraftSiteData() {
    try {
      var raw = window.localStorage.getItem(DRAFT_STORAGE_KEY);
      return raw ? mergeWithDefaults(JSON.parse(raw)) : null;
    } catch (error) {
      return null;
    }
  }

  async function loadSiteData(options) {
    var settings = options || {};
    var draft = settings.allowDraft ? getDraftSiteData() : null;

    if (draft) {
      return draft;
    }

    try {
      return await loadSiteHtmlData();
    } catch (error) {
      return deepClone(DEFAULT_SITE_DATA);
    }
  }

  function saveDraftSiteData(data) {
    window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(mergeWithDefaults(data)));
  }

  function clearDraftSiteData() {
    window.localStorage.removeItem(DRAFT_STORAGE_KEY);
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function normalizePrimaryMetaIcon(value, fallbackText) {
    var icon = String(value || '').toLowerCase();
    var text = String(fallbackText || '').toLowerCase();

    if (icon === 'date' || icon === 'data') {
      return 'date';
    }

    if (icon === 'value' || icon === 'valor') {
      return 'value';
    }

    if (
      /\b\d{1,2}[/-]\d{1,2}([/-]\d{2,4})?\b/.test(text) ||
      /\b(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez|janeiro|fevereiro|marco|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)\b/.test(text)
    ) {
      return 'date';
    }

    return 'value';
  }

  function getPrimaryMetaIconSvg(value, fallbackText) {
    if (normalizePrimaryMetaIcon(value, fallbackText) === 'date') {
      return '<svg class="meta-icon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M16 2v4M8 2v4M3 10h18"></path></svg>';
    }

    return '<svg class="meta-icon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"></circle><path d="M12 7v10"></path><path d="M15 9.5c0-1.1-1.3-2-3-2s-3 .9-3 2 1.1 1.7 3 2c1.9.3 3 1 3 2.5s-1.3 2-3 2-3-.9-3-2"></path></svg>';
  }

  function renderReasons(items) {
    return (items || []).map(function (item) {
      return '            <li>' + escapeHtml(item) + '</li>';
    }).join('\n');
  }

  function renderCards(cards) {
    return (cards || []).map(function (card) {
      return [
        '        <article class="card">',
        '          <div class="card-img">',
        '            <img src="' + escapeHtml(card.image) + '" alt="' + escapeHtml(card.imageAlt || card.title || 'Curso') + '">',
        '            <span class="card-tag">' + escapeHtml(card.tag) + '</span>',
        '          </div>',
        '          <div class="card-body">',
        '            <p class="card-title">' + escapeHtml(card.title) + '</p>',
        '            <div class="card-meta">',
        '              <div class="meta-row">',
        '                ' + getPrimaryMetaIconSvg(card.primaryIcon, card.primaryInfo),
        '                ' + escapeHtml(card.primaryInfo),
        '              </div>',
        '              <div class="meta-row">',
        '                <svg class="meta-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path><circle cx="12" cy="9" r="2.5"></circle></svg>',
        '                ' + escapeHtml(card.secondaryInfo),
        '              </div>',
        '            </div>',
        '            <div class="card-actions">',
        '              <a class="btn-inscricao" href="' + escapeHtml(card.buttonHref || '#contato') + '">' + escapeHtml(card.buttonText || 'Fazer minha inscricao') + '</a>',
        '              <a class="btn-info-curso" href="' + escapeHtml(card.infoHref || 'payment.html') + '">' + escapeHtml(card.infoText || 'Informacoes do curso') + '</a>',
        '            </div>',
        '          </div>',
        '        </article>'
      ].join('\n');
    }).join('\n');
  }

  function renderDifferentials(items) {
    return (items || []).map(function (item) {
      return [
        '        <article class="info-card">',
        '          <div class="eyebrow">' + escapeHtml(item.eyebrow) + '</div>',
        '          <h3>' + escapeHtml(item.title) + '</h3>',
        '          <p>' + escapeHtml(item.text) + '</p>',
        '        </article>'
      ].join('\n');
    }).join('\n');
  }

  function renderPaymentMethods(items) {
    return (items || []).map(function (item) {
      return [
        '        <article class="info-card payment-card">',
        '          <div class="eyebrow">' + escapeHtml(item.eyebrow) + '</div>',
        '          <h3>' + escapeHtml(item.title) + '</h3>',
        '          <p>' + escapeHtml(item.text) + '</p>',
        '        </article>'
      ].join('\n');
    }).join('\n');
  }

  function renderFooterContactItems(footer) {
    var items = [];

    if (footer.emailPrimary) {
      items.push('          <li><a id="footer-email-primary-link" href="mailto:' + escapeHtml(footer.emailPrimary) + '"><span id="footer-email-primary-text">' + escapeHtml(footer.emailPrimary) + '</span></a></li>');
    }
    if (footer.emailSecondary) {
      items.push('          <li><a id="footer-email-secondary-link" href="mailto:' + escapeHtml(footer.emailSecondary) + '"><span id="footer-email-secondary-text">' + escapeHtml(footer.emailSecondary) + '</span></a></li>');
    }

    items.push('          <li><a id="footer-phone-link" href="' + escapeHtml(footer.phoneHref) + '"><span id="footer-phone-text">' + escapeHtml(footer.phoneText) + '</span></a></li>');
    items.push('          <li><a id="footer-whatsapp-link" href="' + escapeHtml(normalizeWhatsAppHref(footer.whatsappHref)) + '" target="_blank" rel="noopener noreferrer"><span id="footer-whatsapp-text">' + escapeHtml(footer.whatsappText) + '</span></a></li>');
    items.push('          <li><a id="footer-address-link" href="' + escapeHtml(normalizeMapHref(footer.address)) + '" target="_blank" rel="noopener noreferrer"><span id="footer-address-text">' + escapeHtml(footer.address) + '</span></a></li>');

    return items.join('\n');
  }

  function generateSiteHtml(data) {
    var site = mergeWithDefaults(data);

    return [
      '<!DOCTYPE html>',
      '<html lang="pt-BR">',
      '<head>',
      '  <meta charset="UTF-8">',
      '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '  <title>Cursos | Hospital Ruy Azeredo</title>',
      '  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'%3E%3Cpath fill=\'%23c62839\' d=\'M12 21s-6.7-4.4-9.2-8.3C.8 9.8 2 5.8 5.7 4.5c2.2-.8 4.5.1 6.3 2.3 1.8-2.2 4.1-3.1 6.3-2.3 3.7 1.3 4.9 5.3 2.9 8.2C18.7 16.6 12 21 12 21Z\'/%3E%3C/svg%3E">',
      '  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&family=Playfair+Display:wght@400;600&display=swap" rel="stylesheet">',
      '  <link rel="stylesheet" href="styles.css">',
      '</head>',
      '<body id="top">',
      '  <div class="topbar">',
      '    <a class="topbar-item" id="topbar-address-link" href="' + escapeHtml(normalizeMapHref(site.topbar.address)) + '" target="_blank" rel="noopener noreferrer">',
      '      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21s7-6.2 7-11.2A7 7 0 0 0 5 9.8C5 14.8 12 21 12 21Z"></path><circle cx="12" cy="10" r="2.6"></circle></svg>',
      '      <span id="topbar-address-text">' + escapeHtml(site.topbar.address) + '</span>',
      '    </a>',
      '    <div>',
      '      <a class="topbar-item" id="topbar-phone-link" href="' + escapeHtml(site.topbar.phoneHref) + '">',
      '        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.8L7.7 9.8a16 16 0 0 0 6.5 6.5l1.3-1.3a2 2 0 0 1 1.8-.6l3 .5A2 2 0 0 1 22 16.9Z"></path></svg>',
      '        <span id="topbar-phone-text">' + escapeHtml(site.topbar.phoneText) + '</span>',
      '      </a>',
      '      <a class="topbar-item" id="topbar-whatsapp-link" href="' + escapeHtml(normalizeWhatsAppHref(site.topbar.whatsappHref)) + '" target="_blank" rel="noopener noreferrer">',
      '        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 3.9A11 11 0 0 0 2.8 17.1L1.5 22.5l5.5-1.3A11 11 0 1 0 20 3.9Zm-8 16.2a9 9 0 0 1-4.6-1.3l-.3-.2-3.2.8.9-3.1-.2-.3A9 9 0 1 1 12 20.1Zm5-6.7c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.1-.4.2-.7 0a7.4 7.4 0 0 1-2.2-1.3 8.4 8.4 0 0 1-1.6-2c-.2-.3 0-.5.1-.7l.5-.6c.1-.1.2-.3.3-.5a.6.6 0 0 0 0-.6c-.1-.2-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.3 3.3 0 0 0-1 2.4c0 1.4 1 2.7 1.2 2.9.1.2 2 3 4.8 4.1 2.8 1.1 2.8.7 3.3.7.5 0 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.4Z"></path></svg>',
      '        <span id="topbar-whatsapp-text">' + escapeHtml(site.topbar.whatsappText) + '</span>',
      '      </a>',
      '    </div>',
      '  </div>',
      '',
      '  <nav>',
      '    <a class="nav-logo" href="#top">',
      '      <div class="logo-icon">',
      '        <img src="logo.png" alt="Logo do Hospital Ruy Azeredo">',
      '      </div>',
      '      <div class="logo-text">',
      '        <strong>Hospital Ruy Azeredo</strong>',
      '        <span>Goiania - Goias</span>',
      '      </div>',
      '    </a>',
      '    <ul class="nav-links">',
      '      <li><a href="#turmas" class="active">Cursos</a></li>',
      '      <li><a href="#diferenciais">Diferenciais</a></li>',
      '      <li><a href="#contato">Contato</a></li>',
      '      <li><a href="' + escapeHtml(site.nav.buttonHref) + '" class="nav-btn" id="nav-cta-link"><span id="nav-cta-text">' + escapeHtml(site.nav.buttonText) + '</span></a></li>',
      '    </ul>',
      '  </nav>',
      '',
      '  <header class="hero">',
      '    <div class="hero-inner">',
      '      <div class="breadcrumb">',
      '        <a href="#top">Inicio</a>',
      '        <span>&gt;</span>',
      '        <span>Cursos</span>',
      '      </div>',
      '      <div class="hero-grid">',
      '        <div>',
      '          <div class="hero-badge">',
      '            <span class="badge-dot"></span>',
      '            <span id="hero-badge-text">' + escapeHtml(site.hero.badge) + '</span>',
      '          </div>',
      '          <h1 id="hero-title">' + escapeHtml(site.hero.title) + '</h1>',
      '          <p class="hero-sub" id="hero-subtitle">' + escapeHtml(site.hero.subtitle) + '</p>',
      '          <p class="hero-alert" id="hero-alert-text">' + escapeHtml(site.hero.alertText) + '</p>',
      '          <div class="hero-actions">',
      '            <a class="btn-primary" id="hero-primary-link" href="' + escapeHtml(site.hero.primaryButtonHref) + '"><span id="hero-primary-text">' + escapeHtml(site.hero.primaryButtonText) + '</span></a>',
      '          </div>',
      '          <div class="hero-stats" id="hero-stats">',
      '            <div>',
      '              <div class="stat-num">' + site.cards.length + '</div>',
      '              <div class="stat-label">cursos em destaque</div>',
      '            </div>',
      '          </div>',
      '        </div>',
      '        <aside class="hero-panel">',
      '          <h3 id="hero-panel-title">' + escapeHtml(site.hero.reasonsTitle) + '</h3>',
      '          <ul id="hero-reasons">',
      renderReasons(site.hero.reasons),
      '          </ul>',
      '        </aside>',
      '      </div>',
      '    </div>',
      '  </header>',
      '',
      '  <main>',
      '    <section class="section" id="turmas">',
      '      <div class="section-label" id="courses-label">' + escapeHtml(site.sections.coursesLabel) + '</div>',
      '      <h2 class="section-title" id="courses-title">' + escapeHtml(site.sections.coursesTitle) + '</h2>',
      '      <p class="section-sub" id="courses-subtitle">' + escapeHtml(site.sections.coursesSubtitle) + '</p>',
      '',
      '      <div class="courses-grid" id="courses-grid">',
      renderCards(site.cards),
      '      </div>',
      '    </section>',
      '',
      '    <section class="section" id="diferenciais">',
      '      <div class="section-label" id="differentials-label">' + escapeHtml(site.sections.differentialsLabel) + '</div>',
      '      <h2 class="section-title" id="differentials-title">' + escapeHtml(site.sections.differentialsTitle) + '</h2>',
      '      <p class="section-sub" id="differentials-subtitle">' + escapeHtml(site.sections.differentialsSubtitle) + '</p>',
      '      <div class="info-grid" id="differentials-grid">',
      renderDifferentials(site.differentials),
      '      </div>',
      '    </section>',
      '  </main>',
      '',
      '  <section class="cta-section" id="contato">',
      '    <div class="cta-inner">',
      '      <div class="cta-text">',
      '        <h3 id="cta-title">' + escapeHtml(site.cta.title) + '</h3>',
      '        <p id="cta-text">' + escapeHtml(site.cta.text) + '</p>',
      '      </div>',
      '      <div class="cta-actions">',
      '        <a class="btn-whatsapp" id="cta-whatsapp-link" href="' + escapeHtml(normalizeWhatsAppHref(site.cta.whatsappHref)) + '" target="_blank" rel="noopener noreferrer"><span id="cta-whatsapp-text">' + escapeHtml(site.cta.whatsappText) + '</span></a>',
      '        <a class="btn-phone" id="cta-phone-link" href="' + escapeHtml(site.cta.phoneHref) + '"><span id="cta-phone-text">' + escapeHtml(site.cta.phoneText) + '</span></a>',
      '      </div>',
      '    </div>',
      '  </section>',
      '',
      '  <footer>',
      '    <div class="footer-grid">',
      '      <div class="footer-brand">',
      '        <div class="nav-logo">',
      '          <div class="logo-icon" style="width:40px;height:40px;background:rgba(255,255,255,0.15);border-radius:8px;overflow:hidden;display:flex;align-items:center;justify-content:center;">',
      '            <img src="logo.png" alt="Logo do Hospital Ruy Azeredo" style="width:100%;height:100%;object-fit:cover;display:block;">',
      '          </div>',
      '          <div class="logo-text">',
      '            <strong>Hospital Ruy Azeredo</strong>',
      '            <span>Goiania - Goias</span>',
      '          </div>',
      '        </div>',
      '        <p id="footer-description">' + escapeHtml(site.footer.description) + '</p>',
      '      </div>',
      '      <div class="footer-col">',
      '        <h4>Menu</h4>',
      '        <ul>',
      '          <li><a href="#top">Inicio</a></li>',
      '          <li><a href="#turmas">Proximas turmas</a></li>',
      '          <li><a href="#diferenciais">Diferenciais</a></li>',
      '          <li><a href="#contato">Contato</a></li>',
      '        </ul>',
      '      </div>',
      '      <div class="footer-col">',
      '        <h4>Contato</h4>',
      '        <ul>',
      renderFooterContactItems(site.footer),
      '        </ul>',
      '      </div>',
      '    </div>',
      '    <div class="footer-bottom">',
      '      <span>&copy;2026 Hospital Ruy Azeredo. Todos os direitos reservados.</span>',
      '      <span>As informacoes do site nao substituem orientacao medica. <a href="#">Privacidade</a></span>',
      '    </div>',
      '  </footer>',
      '  <script src="embed-navigation.js"></script>',
      '</body>',
      '</html>',
      ''
    ].join('\n');
  }

  function downloadTextFile(filename, content, mimeType) {
    var blob = new window.Blob([content], {
      type: mimeType || 'text/plain'
    });
    var url = window.URL.createObjectURL(blob);
    var link = document.createElement('a');

    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.setTimeout(function () {
      window.URL.revokeObjectURL(url);
    }, 1000);
  }

  async function pickSiteFileHandle(existingHandle) {
    if (existingHandle) {
      return existingHandle;
    }

    var pickerOptions = {
      multiple: false,
      types: [
        {
          description: 'Arquivo HTML',
          accept: {
            'text/html': ['.html']
          }
        }
      ]
    };

    if (window.showOpenFilePicker) {
      var handles = await window.showOpenFilePicker(pickerOptions);
      return handles && handles[0] ? handles[0] : null;
    }

    if (window.showSaveFilePicker) {
      return await window.showSaveFilePicker({
        suggestedName: SITE_FILE_NAME,
        types: pickerOptions.types
      });
    }

    return null;
  }

  async function saveSiteHtmlFile(data, existingHandle) {
    var content = generateSiteHtml(data);
    var handle = await pickSiteFileHandle(existingHandle);

    if (handle) {
      var writable = await handle.createWritable();
      await writable.write(content);
      await writable.close();

      return {
        handle: handle,
        method: window.showOpenFilePicker ? 'overwrite' : 'filesystem'
      };
    }

    downloadTextFile(SITE_FILE_NAME, content, 'text/html;charset=utf-8');
    return {
      handle: null,
      method: 'download'
    };
  }

  window.HospitalCoursesData = {
    DRAFT_STORAGE_KEY: DRAFT_STORAGE_KEY,
    SITE_FILE_NAME: SITE_FILE_NAME,
    DEFAULT_SITE_DATA: DEFAULT_SITE_DATA,
    deepClone: deepClone,
    normalizeMapHref: normalizeMapHref,
    normalizeWhatsAppHref: normalizeWhatsAppHref,
    normalizePrimaryMetaIcon: normalizePrimaryMetaIcon,
    getPrimaryMetaIconSvg: getPrimaryMetaIconSvg,
    loadSiteHtmlData: loadSiteHtmlData,
    getDraftSiteData: getDraftSiteData,
    loadSiteData: loadSiteData,
    saveDraftSiteData: saveDraftSiteData,
    clearDraftSiteData: clearDraftSiteData,
    generateSiteHtml: generateSiteHtml,
    saveSiteHtmlFile: saveSiteHtmlFile
  };
})();
