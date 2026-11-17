// Serveur HTTP statique sans dépendance, prêt pour Clever Cloud (Node.js).
// Clever Cloud fournit le port via la variable d'environnement PORT (8080 par défaut).
const http = require("http");
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const PORT = process.env.PORT || 8080;
// Version des fichiers CSS/JS, différente à chaque déploiement : ajoutée aux liens des pages HTML
// (?v=...), elle oblige les navigateurs à recharger les fichiers au lieu d'utiliser une ancienne copie.
const VERSION = Date.now().toString(36);
const ROOT = path.join(__dirname, "public");

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".txt": "text/plain; charset=utf-8",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};
const COMPRESSIBLE = new Set([".html", ".css", ".js", ".json", ".svg", ".txt", ".xml"]);

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

function send(res, status, body, type) {
  res.writeHead(status, { "Content-Type": type, ...SECURITY_HEADERS });
  res.end(body);
}

const server = http.createServer((req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    return send(res, 405, "Method Not Allowed", "text/plain; charset=utf-8");
  }

  let urlPath;
  try {
    urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  } catch {
    return send(res, 400, "Bad Request", "text/plain; charset=utf-8");
  }

  if (urlPath === "/health") {
    return send(res, 200, "ok", "text/plain; charset=utf-8");
  }

  let filePath = path.normalize(path.join(ROOT, urlPath));
  if (!filePath.startsWith(ROOT)) {
    return send(res, 403, "Forbidden", "text/plain; charset=utf-8");
  }

  fs.stat(filePath, (err, stat) => {
    if (!err && stat.isDirectory()) filePath = path.join(filePath, "index.html");

    fs.readFile(filePath, (readErr, data) => {
      if (readErr) {
        return fs.readFile(path.join(ROOT, "404.html"), (e404, page) =>
          send(res, 404, e404 ? "Not Found" : page.toString("utf8").replace(/(\/assets\/[\w.-]+\.(?:css|js))(?=")/g, `$1?v=${VERSION}`), "text/html; charset=utf-8")
        );
      }
      const ext = path.extname(filePath).toLowerCase();
      if (ext === ".html") {
        data = Buffer.from(data.toString("utf8").replace(/(\/assets\/[\w.-]+\.(?:css|js))(?=")/g, `$1?v=${VERSION}`));
      }
      // HTML, CSS et JS sont revalidés à chaque visite pour voir les mises à jour aussitôt ;
      // images et polices restent en cache une semaine.
      const cache = [".html", ".css", ".js"].includes(ext) ? "no-cache" : "public, max-age=604800";
      const headers = {
        "Content-Type": TYPES[ext] || "application/octet-stream",
        "Cache-Control": cache,
        Vary: "Accept-Encoding",
        ...SECURITY_HEADERS,
      };
      const gzip = COMPRESSIBLE.has(ext) && /\bgzip\b/.test(req.headers["accept-encoding"] || "");
      if (gzip) {
        data = zlib.gzipSync(data);
        headers["Content-Encoding"] = "gzip";
      }
      headers["Content-Length"] = data.length;
      res.writeHead(200, headers);
      res.end(req.method === "HEAD" ? undefined : data);
    });
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Portfolio en ligne sur le port ${PORT}`);
});
