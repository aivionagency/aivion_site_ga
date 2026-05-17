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

  // ПРАГМАТИЧНЫЙ РОУТИНГ ДЛЯ ЮР. ДОКУМЕНТОВ:
  // Гарантирует корректное чтение файлов, даже если в ссылке на сайте не указано .html
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
    console.error(`[404 NOT FOUND]: Ошибка чтения пути "${root}/${relativePath}"`);
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

    // 1. ОБРАБОТКА КОНТУРА ЗАЯВОК (POST API)
    if (request.method === "POST" && url.pathname === "/api/contact") {
      try {
        const body = await request.json();

        // Проверка скрытого поля Honeypot против спам-ботов
        if (body.website && body.website.trim() !== "") {
          console.warn("[Honeypot]: Заблокирована автоматическая отправка ботом.");
          return new Response(JSON.stringify({ ok: true, message: "Silent drop" }), {
            headers: { "Content-Type": "application/json" }
          });
        }

        // Валидация обязательных полей
        if (!body.firstName || !body.contact || !body.details) {
          return new Response(JSON.stringify({ ok: false, message: "Заполните обязательные поля." }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
          });
        }

        // Вывод лида в консоль сервера (здесь можно подключить интеграцию с Telegram-ботом/CRM)
        console.log("[Новая заявка с сайта]:", JSON.stringify(body, null, 2));

        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });

      } catch (err) {
        console.error("[API Error]:", err);
        return new Response(JSON.stringify({ ok: false, message: "Внутренняя ошибка сервера." }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
    }

    // 2. ОБРАБОТКА СТАТИКИ (GET запросы страниц, скриптов, стилей)
    const relativePath = resolvePath(url.pathname);
    if (!relativePath) {
      return new Response("Некорректный путь", { status: 400 });
    }

    return serveFile(relativePath);
  }
});

console.log(`Сервер успешно запущен на порту: ${port}`);