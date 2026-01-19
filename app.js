const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 8080;

const FEATURES = {
  darkMode: false,
  showAnnouncement: true
};

const server = http.createServer((req, res) => {
  if (req.url === "/style.css") {
    const cssPath = path.join(__dirname, "public", "style.css");
    const css = fs.readFileSync(cssPath);
    res.writeHead(200, { "Content-Type": "text/css" });
    return res.end(css);
  }

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Axia</title>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body class="${FEATURES.darkMode ? "dark" : "light"}">
      <div class="container">
        <h1>Axia</h1>
        <p class="tagline">Deploy faster. Scale smarter.</p>

        ${
          FEATURES.showAnnouncement
            ? `<div class="announcement">New features rolling out this week</div>`
            : ``
        }

        <button>Get Started</button>
      </div>
    </body>
    </html>
  `);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
