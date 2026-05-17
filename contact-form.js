(function () {
  if (document.getElementById('contactModal')) return;

  const style = document.createElement('style');
  style.textContent = `
    .contact-modal{position:fixed;inset:0;z-index:300;opacity:0;pointer-events:none;transition:opacity .35s ease}
    .contact-modal.is-open{opacity:1;pointer-events:all}
    .contact-modal__backdrop{position:absolute;inset:0;background:rgba(0,0,0,0.82);backdrop-filter:blur(12px)}
    .contact-modal__dialog{position:absolute;inset:0;overflow-y:auto;display:flex;align-items:flex-start;justify-content:center;padding:clamp(20px,5vw,60px) clamp(16px,4vw,40px)}
    .contact-modal__content{position:relative;z-index:1;width:min(100%,900px);background:rgba(10,5,0,0.95);border:1px solid rgba(255,255,255,0.14);border-radius:18px;overflow:hidden;display:grid;grid-template-columns:1fr 1.4fr;gap:0}
    .contact-modal__close{position:absolute;top:20px;right:20px;z-index:10;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.18);color:rgba(107,114,128,1);font-size:20px;line-height:1;display:grid;place-items:center;cursor:pointer;transform:rotate(45deg);transition:background .2s,color .2s}
    .contact-modal__close:hover{background:rgba(255,255,255,0.12);color:#fff}
    .cf-side{background:rgba(232,146,10,0.04);border-right:1px solid rgba(255,255,255,0.14);padding:44px 36px;display:flex;flex-direction:column;gap:20px}
    .cf-side h2{font-family:"Montserrat",sans-serif;font-size:clamp(22px,2.5vw,32px);font-weight:800;letter-spacing:-0.03em;color:#fff;line-height:1.2}
    .cf-side-text{font-family:"Montserrat",sans-serif;font-size:14px;color:rgba(255,255,255,0.65);line-height:1.7}
    .cf-eyebrow{font-family:"Montserrat",sans-serif;font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#E8920A}
    .cf-scope-card{padding:20px;border-radius:14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.10)}
    .cf-scope-card h3{font-family:"Montserrat",sans-serif;font-size:15px;font-weight:700;margin-bottom:12px;color:#fff}
    .cf-scope-list{list-style:none;display:flex;flex-direction:column;gap:8px}
    .cf-scope-list li{font-family:"Montserrat",sans-serif;font-size:13px;color:rgba(255,255,255,0.65);line-height:1.5;padding-left:16px;position:relative}
    .cf-scope-list li::before{content:"";position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:#E8920A}
    .cf-main{padding:44px 36px}
    .cf-form{display:flex;flex-direction:column;gap:18px}
    .cf-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
    .cf-label{display:flex;flex-direction:column;gap:7px}
    .cf-label-text{font-family:"Montserrat",sans-serif;font-size:11px;font-weight:600;letter-spacing:0.10em;text-transform:uppercase;color:rgba(107,114,128,1)}
    .cf-input{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.18);border-radius:12px;padding:12px 16px;color:#fff;font-family:"Montserrat",sans-serif;font-size:14px;transition:border-color .2s;outline:none;width:100%}
    .cf-input:focus{border-color:rgba(232,146,10,0.45)}
    .cf-input[type=textarea],.cf-textarea{min-height:100px;resize:vertical}
    .cf-input option{background:#0a0500;color:#fff}
    .cf-roles{border:none}
    .cf-roles legend{font-family:"Montserrat",sans-serif;font-size:11px;font-weight:600;letter-spacing:0.10em;text-transform:uppercase;color:rgba(107,114,128,1);margin-bottom:10px}
    .cf-roles-grid{display:flex;flex-wrap:wrap;gap:8px}
    .cf-chip{display:flex;align-items:center;cursor:pointer}
    .cf-chip input{display:none}
    .cf-chip span{font-family:"Montserrat",sans-serif;font-size:12px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;padding:8px 16px;border-radius:999px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.18);color:rgba(107,114,128,1);transition:all .2s}
    .cf-chip input:checked + span{background:rgba(232,146,10,0.14);border-color:rgba(232,146,10,0.45);color:#E8920A}
    .cf-custom-role{display:none}
    .cf-custom-role.is-visible{display:flex}
    .cf-consents{display:flex;flex-direction:column;gap:10px}
    .cf-consent{display:flex;gap:10px;align-items:flex-start;cursor:pointer}
    .cf-consent input{margin-top:3px;accent-color:#E8920A;flex-shrink:0}
    .cf-consent span{font-size:13px;color:rgba(107,114,128,1);line-height:1.55}
    .cf-consent a{color:#E8920A;text-decoration:none}
    .cf-legal{font-size:12px;color:rgba(107,114,128,1);opacity:0.7;line-height:1.5}
    .cf-footer{display:flex;align-items:center;gap:16px;flex-wrap:wrap}
    .cf-status{font-size:13px;font-family:"Montserrat",sans-serif}
    .cf-status.is-success{color:#34d399}
    .cf-status.is-error{color:#f87171}
    .cf-trap{display:none !important}
    .cf-submit{display:inline-flex;align-items:center;justify-content:center;padding:13px 26px;border-radius:999px;border:none;background:#E8920A;color:#1a0800;font-weight:700;font-family:"Montserrat",sans-serif;font-size:14px;cursor:pointer;transition:background .2s,transform .2s}
    .cf-submit:hover{background:#F5A822;transform:translateY(-1px)}
    .cf-submit:disabled{opacity:0.6;cursor:not-allowed;transform:none}
    @media(max-width:900px){
      .contact-modal__content{grid-template-columns:1fr}
      .cf-side{border-right:none;border-bottom:1px solid rgba(255,255,255,0.14)}
    }
    @media(max-width:620px){.cf-grid{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);

  document.body.insertAdjacentHTML('beforeend', `
  <div class="contact-modal" id="contactModal" aria-hidden="true">
    <div class="contact-modal__backdrop" data-close-form></div>
    <div class="contact-modal__dialog">
      <div class="contact-modal__content">
        <button class="contact-modal__close" type="button" aria-label="Закрыть" data-close-form>+</button>
        <aside class="cf-side">
          <p class="cf-eyebrow">Запрос</p>
          <h2>Обсудим задачу предметно</h2>
          <p class="cf-side-text">Опишите задачу коротко и по сути. Мы используем только необходимые данные, чтобы связаться с вами и подготовить следующий шаг.</p>
          <div class="cf-scope-card">
            <h3>Что важно знать</h3>
            <ul class="cf-scope-list">
              <li>обязательные поля сведены к минимуму</li>
              <li>согласие даётся отдельным действием</li>
              <li>политика доступна до отправки формы</li>
            </ul>
          </div>
        </aside>
        <div class="cf-main">
          <form class="cf-form" id="cfForm">
            <div class="cf-grid">
              <label class="cf-label">
                <span class="cf-label-text">Имя *</span>
                <input class="cf-input" type="text" name="firstName" autocomplete="given-name" required/>
              </label>
              <label class="cf-label">
                <span class="cf-label-text">Компания</span>
                <input class="cf-input" type="text" name="company" autocomplete="organization"/>
              </label>
            </div>
            <div class="cf-grid">
              <label class="cf-label">
                <span class="cf-label-text">Контакт для связи *</span>
                <input class="cf-input" type="text" name="contact" required autocomplete="email tel" placeholder="Телефон, email или Telegram"/>
              </label>
              <label class="cf-label">
                <span class="cf-label-text">Предпочтительный канал</span>
                <select class="cf-input" name="contactMethod">
                  <option value="Telegram">Telegram</option>
                  <option value="Телефон">Телефон</option>
                  <option value="Email">Email</option>
                  <option value="WhatsApp">WhatsApp</option>
                </select>
              </label>
            </div>
            <fieldset class="cf-roles">
              <legend>Ваша роль</legend>
              <div class="cf-roles-grid">
                <label class="cf-chip"><input type="radio" name="role" value="Собственник" checked/><span>Собственник</span></label>
                <label class="cf-chip"><input type="radio" name="role" value="Руководитель"/><span>Руководитель</span></label>
                <label class="cf-chip"><input type="radio" name="role" value="Маркетинг"/><span>Маркетинг</span></label>
                <label class="cf-chip"><input type="radio" name="role" value="Другое"/><span>Другое</span></label>
              </div>
            </fieldset>
            <label class="cf-label cf-custom-role" id="cfCustomRole">
              <span class="cf-label-text">Уточните роль</span>
              <input class="cf-input" type="text" name="customRole"/>
            </label>
            <label class="cf-label">
              <span class="cf-label-text">Кратко о задаче *</span>
              <textarea class="cf-input cf-textarea" name="details" required minlength="10" placeholder="Например: хотим сократить ручную обработку заявок и выстроить понятный контур работы с лидами"></textarea>
            </label>
            <label class="cf-label cf-trap" aria-hidden="true">
              <span class="cf-label-text">Website</span>
              <input class="cf-input" type="text" name="website" tabindex="-1" autocomplete="off"/>
            </label>
            <div class="cf-consents">
              <label class="cf-consent">
                <input type="checkbox" name="policyAccepted" value="yes" required/>
                <span>Я ознакомился(ась) с <a href="/privacy" target="_blank" rel="noopener noreferrer">Политикой обработки персональных данных</a>.</span>
              </label>
              <label class="cf-consent">
                <input type="checkbox" name="consentAccepted" value="yes" required/>
                <span>Даю согласие на обработку моих персональных данных в соответствии с <a href="/consent" target="_blank" rel="noopener noreferrer">текстом согласия</a>.</span>
              </label>
            </div>
            <p class="cf-legal">Если вы не дадите согласие на обработку данных, мы не сможем обработать заявку.</p>
            <div class="cf-footer">
              <button class="cf-submit" type="submit" id="cfSubmitBtn">Отправить запрос</button>
              <p class="cf-status" id="cfStatus" aria-live="polite"></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>`);

  const modal = document.getElementById('contactModal');
  const form = document.getElementById('cfForm');
  const customRole = document.getElementById('cfCustomRole');
  const status = document.getElementById('cfStatus');
  const submitBtn = document.getElementById('cfSubmitBtn');

  function openModal() {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const first = modal.querySelector('input,textarea');
    if (first) setTimeout(() => first.focus(), 40);
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-open-form], [data-open-brief]') ||
        e.target.id === 'openBriefBtn') {
      e.preventDefault();
      openModal();
      return;
    }
    if (e.target.closest('[data-close-form]')) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  function syncRole() {
    if (!form || !customRole) return;
    const sel = form.querySelector('input[name="role"]:checked');
    const isOther = sel && sel.value === 'Другое';
    const inp = customRole.querySelector('input');
    customRole.classList.toggle('is-visible', Boolean(isOther));
    inp.required = Boolean(isOther);
    if (!isOther) { inp.value = ''; inp.setCustomValidity(''); }
  }

  if (form) {
    form.addEventListener('change', function (e) {
      if (e.target.name === 'role') syncRole();
    });

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (!form.reportValidity()) {
        status.textContent = 'Проверьте обязательные поля.';
        status.className = 'cf-status is-error';
        return;
      }
      submitBtn.disabled = true;
      submitBtn.textContent = 'Отправляем...';
      status.textContent = '';
      status.className = 'cf-status';
      try {
        const data = new FormData(form);
        const botTrap = String(data.get('website') || '').trim();

        if (botTrap !== '') {
          // Имитируем успешный ответ для спам-скрипта без триггера сети
          status.textContent = 'Запрос отправлен. Скоро свяжемся с вами.';
          status.className = 'cf-status is-success';
          form.reset();
          setTimeout(() => closeModal(), 900);
          return;
        }
        const payload = {
          firstName: String(data.get('firstName') || '').trim(),
          company: String(data.get('company') || '').trim(),
          contact: String(data.get('contact') || '').trim(),
          contactMethod: String(data.get('contactMethod') || '').trim(),
          role: String(data.get('role') || '').trim(),
          customRole: String(data.get('customRole') || '').trim(),
          details: String(data.get('details') || '').trim(),
          policyAccepted: data.get('policyAccepted') === 'yes',
          consentAccepted: data.get('consentAccepted') === 'yes',
          website: String(data.get('website') || '').trim()
        };
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const result = await res.json();
        if (!res.ok || !result.ok) throw new Error(result.message || 'Ошибка отправки.');
        form.reset();
        syncRole();
        status.textContent = 'Запрос отправлен. Скоро свяжемся с вами.';
        status.className = 'cf-status is-success';
        setTimeout(() => closeModal(), 900);
      } catch (err) {
        status.textContent = err.message || 'Не удалось отправить запрос. Попробуйте снова.';
        status.className = 'cf-status is-error';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Отправить запрос';
      }
    });

    syncRole();
  }
})();
