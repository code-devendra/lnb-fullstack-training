const http = require("http");
const fs = require("fs");

const PORT = 8080;
const hostname = "127.0.0.1";

const home = fs.readFileSync("./index.html", "utf-8");
const about = fs.readFileSync("./about.html", "utf-8");
const contact = fs.readFileSync("./contact.html", "utf-8");

const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/home' || req.url === '/index') {
        return res.end(home);
    } else if (req.url === '/about') {
        return res.end(about);
    } else if (req.url === '/contact') {
        return res.end(contact);
    } else {
        return res.end("<h1>404 Page Not Found</h1>");
    }
});

server.listen(PORT, hostname, () => {
    console.log(`Server is working on http://${hostname}:${PORT}`);
});