const port = Number(Bun.env.PORT || 3000);
const root = import.meta.dir;

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon"
};

function resolvePath(urlPath) {
  if (urlPath === "/" || urlPath === "/Aivion.html") return "index.html";

  // ЖЕСТКИЙ ПРАГМАТИЧНЫЙ РОУТИНГ: Склеиваем чистый URL сайта с реальным физическим файлом на диске
  if (urlPath === "/privacy" || urlPath === "/privacy.html") return "privacy.html";
  if (urlPath === "/consent" || urlPath === "/consent.html") return "consent.html";

  const cleanPath = decodeURIComponent(urlPath).replace(/^\/+/, "");
  if (!cleanPath || cleanPath.includes("..")) return null;

  return cleanPath;
}

function getContentType(pathname) {
  const dotIndex = pathname.lastIndexOf(".");
  if (dotIndex === -1) return "application/octet-stream";

  const extension = pathname.slice(dotIndex).toLowerCase();
  return contentTypes[extension] || "application/octet-stream";
}

async function serveFile(relativePath) {
  const file = Bun.file(`${root}/${relativePath}`);

  if (!(await file.exists())) {
    return new Response("Файл не найден", { status: 404 });
  }

  return new Response(file, {
    headers: {
      "Content-Type": getContentType(relativePath)
    }
  });
}

Bun.serve({
  port,
  async fetch(request) {
    const url = new URL(request.url);

    // ИНТЕГРАЦИЯ БЭКЕНД-КОНТУРА (TELEGRAM + GOOGLE SHEETS)
    if (request.method === "POST" && url.pathname === "/api/contact") {
      try {
        const body = await request.json();

        // 1. Honeypot ловушка против спам-ботов
        if (body.website && body.website.trim() !== "") {
          return new Response(JSON.stringify({ ok: true, message: "Spam drop" }), { headers: { "Content-Type": "application/json" } });
        }

        // 2. Базовая валидация
        if (!body.firstName || !body.contact || !body.details) {
          return new Response(JSON.stringify({ ok: false, message: "Заполните обязательные поля." }), { status: 400 });
        }

        // 3. Достаем ключи из окружения
        const tgToken = Bun.env.TELEGRAM_BOT_TOKEN;
        const tgChatId = Bun.env.TELEGRAM_CHAT_ID;
        const sheetUrl = Bun.env.GOOGLE_SHEET_WEBHOOK_URL;

        const promises = [];

        // 4. Формируем и запускаем запрос в TELEGRAM (С защитой от блокировок хостинга)
        if (tgToken && tgChatId) {
          const tgMessage =
            `🔥 Новая заявка Aivion\n\n` +
            `👤 Имя: ${body.firstName}\n` +
            `🏢 Компания: ${body.company || "Не указана"}\n` +
            `💼 Роль: ${body.role || "Не указана"}\n` +
            `📞 Связь: (${body.contactMethod}) ${body.contact}\n\n` +
            `📝 Описание проекта:\n${body.details}`;

          // ПОДДЕРЖКА ЗЕРКАЛА: если в ТГ блокирует ваш хостинг, используем зеркало по умолчанию
          const apiBase = Bun.env.TELEGRAM_API_BASE || "https://api.telegram-proxy.org";

          const tgRequest = fetch(`${apiBase}/bot${tgToken}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: tgChatId,
              text: tgMessage
            })
          }).then(async (res) => {
            if (!res.ok) {
              const errorResponse = await res.text();
              console.error(`[Telegram API Error]: Ошибка от ТГ: ${errorResponse}`);
            } else {
              console.log("[Telegram Success]: Уведомление успешно доставлено в чат.");
            }
          }).catch((err) => {
            console.error("[Telegram Network Error]: Не удалось связаться с сервером Telegram:", err);
          });

          promises.push(tgRequest);
        }

        // 5. Формируем и запускаем запрос в GOOGLE SHEETS
        if (sheetUrl) {
          const sheetRequest = fetch(sheetUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              date: new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" }),
              firstName: body.firstName,
              company: body.company || "—",
              role: body.customRole || body.role || "—",
              contactMethod: body.contactMethod,
              contact: body.contact,
              details: body.details
            })
          });
          promises.push(sheetRequest);
        }

        // 6. ЗАГЛУШКА ДЛЯ БУДУЩЕЙ БАЗЫ ДАННЫХ
        // TODO: В будущем здесь будет const dbRequest = prisma.lead.create({ data: body })
        // promises.push(dbRequest);

        // 7. Параллельно ждем выполнения всех запросов (чтобы ответ формы не тормозил)
        await Promise.allSettled(promises);

        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });

      } catch (err) {
        console.error("[API Error]:", err);
        return new Response(JSON.stringify({ ok: false, error: "Внутренняя ошибка сервера" }), { status: 500 });
      }
    }

    // СТАНДАРТНАЯ ОТДАЧА СТАТИКИ С УЧЕТОМ ИСПРАВЛЕННОГО РОУТИНГА
    const relativePath = resolvePath(url.pathname);

    if (!relativePath) {
      return new Response("Некорректный путь", { status: 400 });
    }

    return serveFile(relativePath);
  }
});

console.log(`Сервер запущен: http://localhost:${port}`);