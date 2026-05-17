window.siteContent = {
  meta: {
    title: "Aivion — AI-системы и автоматизация для бизнеса",
    description: "Проектирование AI-систем, автоматизации и внутренних цифровых контуров для бизнеса."
  },
  navigation: {
    desktop: ["Кейсы", "Услуги", "Обсудить задачу"],
    mobile: ["Кейсы", "Услуги", "Обсудить задачу"],
    menuToggle: "Открыть меню",
    modalClose: "Закрыть"
  },
  opening: {
    eyebrow: "AI-Автоматизация · IT-Разработка",
    titleHtml: "Масштабируйте бизнес <br>с помощью  <span class=\"title-accent\">ИИ</span>",
    lead: "Сокращаем до 60% затрат на операционку с помощью автоматизации и AI",
    actions: ["Узнать больше", "Посмотреть кейсы"],
  },
  heroPanels: [
    "Раньше под 9/10 задач приходилось нанимать людей",
    "Но рынок поменялся. Теперь их может выполнять ИИ",
    "И делать это за копейки"
  ],
  services: {
    eyebrow: "Что делаем",
    title: "Строим не разрозненные инструменты, а управляемый цифровой слой бизнеса",
    text: "Иногда задача решается AI, иногда — интерфейсом, ботом, регламентом или новой логикой процесса.",
    cards: [
      {
        title: "AI и автоматизация",
        items: [
          "AI-ассистенты для команд и отделов",
          "автоматизация обработки заявок и документов",
          "разбор диалогов, брифов и входящих обращений",
          "контентные и аналитические AI-сценарии"
        ]
      },
      {
        title: "Системы и интерфейсы",
        items: [
          "сайты и landing pages с сильной подачей",
          "внутренние кабинеты, CRM и панели",
          "Telegram-боты и операционные интеграции",
          "архитектура данных, ролей и сценариев доступа"
        ]
      }
    ]
  },
  process: {
    eyebrow: "Процесс",
    title: "Работаем так, чтобы с первого шага было понятно, зачем нужен следующий",
    steps: [
      {
        title: "Первичный разбор",
        text: "Фиксируем задачу, ограничения, текущий процесс и точку, в которой команда теряет ресурс."
      },
      {
        title: "Модель решения",
        text: "Предлагаем конкретный контур: что автоматизировать, что оставить людям и где нужен интерфейс."
      },
      {
        title: "Проектирование и запуск",
        text: "Собираем визуальный и технический слой, тестируем пользовательский сценарий и доводим запуск до рабочего состояния."
      },
      {
        title: "Встраивание в процессы",
        text: "Помогаем не просто выпустить решение, а встроить его в реальную повседневную работу команды."
      },
      {
        title: "Поддержка и развитие",
        text: "После запуска отслеживаем стабильность, корректируем UX и масштабируем систему по мере роста бизнеса."
      }
    ]
  },
  quote: {
    textHtml: "Хороших людей не становится больше.<br><em>Но то, что они успевают —<br>можно увеличить.</em>",
    action: "Обсудить задачу"
  },
  footer: {
    tagline: "AI-системы, автоматизация и внутренние цифровые контуры — для команд, которые хотят работать умнее.",
    navTitle: "Навигация",
    navLinks: ["Кейсы", "Что делаем", "Написать нам"],
    copy: "© 2025 Aivion. Все права защищены.",
    legal: ["Политика персональных данных", "Согласие на обработку данных"]
  },
  modal: {
    eyebrow: "Запрос",
    title: "Обсудим задачу предметно",
    text: "Опишите задачу коротко и по сути. Мы используем только необходимые данные, чтобы связаться с вами и подготовить следующий шаг.",
    scopeTitle: "Что важно знать",
    scopeItems: [
      "обязательные поля сведены к минимуму",
      "согласие даётся отдельным действием",
      "политика доступна до отправки формы"
    ],
    fields: {
      firstName: "Имя *",
      company: "Компания",
      contact: "Контакт для связи *",
      contactPlaceholder: "Телефон, email или Telegram",
      contactMethod: "Предпочтительный канал",
      roleLegend: "Ваша роль",
      roles: ["Собственник", "Руководитель", "Маркетинг", "Другое"],
      customRole: "Уточните роль",
      details: "Кратко о задаче *",
      detailsPlaceholder: "Например: хотим сократить ручную обработку заявок и выстроить понятный контур работы с лидами"
    },
    contactMethods: ["Telegram", "Телефон", "Email", "WhatsApp"],
    policyHtml: "Я ознакомился(ась) с <a href=\"/privacy\" target=\"_blank\" rel=\"noopener noreferrer\">Политикой обработки персональных данных</a>.",
    consentHtml: "Даю согласие на обработку моих персональных данных в соответствии с <a href=\"/consent\" target=\"_blank\" rel=\"noopener noreferrer\">текстом согласия</a>.",
    legalNote: "Если вы не дадите согласие на обработку данных, мы не сможем обработать заявку.",
    submit: "Отправить запрос",
    messages: {
      required: "Проверьте обязательные поля.",
      submitting: "Отправляем...",
      sendError: "Ошибка отправки.",
      success: "Запрос отправлен. Скоро свяжемся с вами.",
      error: "Не удалось отправить запрос. Попробуйте снова.",
      submit: "Отправить запрос"
    }
  }
};

(function applySiteContent() {
  const content = window.siteContent;
  if (!content) return;

  const setText = (node, value) => {
    if (node && typeof value === "string") node.textContent = value;
  };

  const setHtml = (node, value) => {
    if (node && typeof value === "string") node.innerHTML = value;
  };

  const setTextList = (nodes, values) => {
    nodes.forEach((node, index) => setText(node, values[index]));
  };

  document.title = content.meta.title;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute("content", content.meta.description);

  const desktopNav = Array.from(document.querySelectorAll("header nav a"));
  const mobileNav = Array.from(document.querySelectorAll(".mobile-nav a"));
  setTextList(desktopNav, content.navigation.desktop);
  setTextList(mobileNav, content.navigation.mobile);
  document.getElementById("menuToggle")?.setAttribute("aria-label", content.navigation.menuToggle);
  document.querySelector(".contact-modal__close")?.setAttribute("aria-label", content.navigation.modalClose);

  setText(document.querySelector(".opening-inner .eyebrow"), content.opening.eyebrow);
  setHtml(document.querySelector(".opening-title"), content.opening.titleHtml);
  setText(document.querySelector(".opening-lead"), content.opening.lead);
  setTextList(Array.from(document.querySelectorAll(".opening-actions a")), content.opening.actions);
//  Array.from(document.querySelectorAll(".hero-stats .hero-stat")).forEach((card, index) => {
//    const item = content.opening.stats[index];
//    if (!item) return;
//    setText(card.querySelector(".stat-label"), item.label);
//    setText(card.querySelector(".stat-value"), item.value);
//  });
//
//  setTextList(Array.from(document.querySelectorAll(".hero-panel .hero-copy")), content.heroPanels);
//
//  setText(document.querySelector(".intro-text h2"), content.intro.title);
//  setText(document.querySelector(".intro-text p"), content.intro.text);
//  Array.from(document.querySelectorAll(".promise-card")).forEach((card, index) => {
//    const item = content.intro.cards[index];
//    if (!item) return;
//    setText(card.querySelector("h3"), item.title);
//    setText(card.querySelector("p"), item.text);
//  });
//  setText(document.querySelector(".shared-wrap .section-action .btn"), content.intro.action);

  setText(document.querySelector("#services .section-heading .eyebrow"), content.services.eyebrow);
  setText(document.querySelector("#services .section-heading h2"), content.services.title);
  setText(document.querySelector("#services .section-heading .section-text"), content.services.text);
  Array.from(document.querySelectorAll("#services .service-card")).forEach((card, index) => {
    const item = content.services.cards[index];
    if (!item) return;
    setText(card.querySelector("h3"), item.title);
    setTextList(Array.from(card.querySelectorAll("li")), item.items);
  });

  setText(document.querySelector("#process .section-heading .eyebrow"), content.process.eyebrow);
  setText(document.querySelector("#process .section-heading h2"), content.process.title);
  Array.from(document.querySelectorAll(".process-step")).forEach((step, index) => {
    const item = content.process.steps[index];
    if (!item) return;
    setText(step.querySelector("h3"), item.title);
    setText(step.querySelector("p"), item.text);
  });

  setHtml(document.querySelector(".quote-break__text"), content.quote.textHtml);
  setText(document.querySelector(".quote-break .btn"), content.quote.action);

  setText(document.querySelector(".footer-tagline"), content.footer.tagline);
  const footerNavColumn = document.querySelector(".footer-nav-group .footer-col");
  if (footerNavColumn) {
    setText(footerNavColumn.querySelector(".footer-col-title"), content.footer.navTitle);
    setTextList(Array.from(footerNavColumn.querySelectorAll(".footer-links a")), content.footer.navLinks);
  }
  setText(document.querySelector(".footer-copy"), content.footer.copy);
  setTextList(Array.from(document.querySelectorAll(".footer-legal a")), content.footer.legal);

  setText(document.querySelector(".contact-side .eyebrow"), content.modal.eyebrow);
  setText(document.querySelector(".contact-side h2"), content.modal.title);
  setText(document.querySelector(".contact-side .section-text"), content.modal.text);
  setText(document.querySelector(".contact-scope h3"), content.modal.scopeTitle);
  setTextList(Array.from(document.querySelectorAll(".contact-scope li")), content.modal.scopeItems);

  const form = document.getElementById("cfForm");

  if (form) {
      // Корректно маппим врапперы полей с новыми классами
      const firstNameField = form.querySelector('input[name="firstName"]')?.closest(".cf-label");
      const companyField = form.querySelector('input[name="company"]')?.closest(".cf-label");
      const contactField = form.querySelector('input[name="contact"]')?.closest(".cf-label");
      const methodField = form.querySelector('select[name="contactMethod"]')?.closest(".cf-label");
      const customRoleField = document.getElementById("cfCustomRole");
      const detailsField = form.querySelector('textarea[name="details"]')?.closest(".cf-label");

      setText(firstNameField?.querySelector("span"), content.modal.fields.firstName);
      setText(companyField?.querySelector("span"), content.modal.fields.company);
      setText(contactField?.querySelector("span"), content.modal.fields.contact);
      form.querySelector('input[name="contact"]')?.setAttribute("placeholder", content.modal.fields.contactPlaceholder);
      setText(methodField?.querySelector("span"), content.modal.fields.contactMethod);

      setText(form.querySelector(".cf-roles legend"), content.modal.fields.roleLegend);
      Array.from(form.querySelectorAll('.cf-chip span')).forEach((node, index) => {
        setText(node, content.modal.fields.roles[index]);
      });

      setText(customRoleField?.querySelector("span"), content.modal.fields.customRole);
      setText(detailsField?.querySelector("span"), content.modal.fields.details);
      form.querySelector('textarea[name="details"]')?.setAttribute("placeholder", content.modal.fields.detailsPlaceholder);

      Array.from(form.querySelectorAll('select[name="contactMethod"] option')).forEach((node, index) => {
        setText(node, content.modal.contactMethods[index]);
      });

      const consentTexts = form.querySelectorAll(".cf-consent span");
      if(consentTexts[0]) setHtml(consentTexts[0], content.modal.policyHtml);
      if(consentTexts[1]) setHtml(consentTexts[1], content.modal.consentHtml);

      setText(form.querySelector(".cf-legal"), content.modal.legalNote);
      setText(document.getElementById("cfSubmitBtn"), content.modal.submit);
  }

  window.formMessages = content.modal.messages;
})();
