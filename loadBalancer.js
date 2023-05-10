const express = require("express");
const httpProxy = require("http-proxy");

const app = express();
const proxy = httpProxy.createProxyServer({});

const servers = {
  POST: "http://localhost:4001",
  GET: "http://localhost:4002",
  PUT: "http://localhost:4003",
  DELETE: "http://localhost:4004",
};

app.all("*", (req, res) => {
  const method = req.method.toUpperCase();
  const serverUrl = servers[method];
  if (serverUrl) {
    proxy.web(req, res, { target: serverUrl });
  } else {
    res.status(400).send(`Unsupported method: ${method}`);
  }
});

app.listen(4000, () => {
  console.log("Load balancer listening on port 4000");
});
