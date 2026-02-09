const http = require("http");

const PORT = process.env.PORT || 3000;
const HOST = "127.0.0.1";

const requestHandler = (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.end("Hello from lunkgymnessdb Node server on localhost!");
};

const server = http.createServer(requestHandler);

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});

module.exports = server;