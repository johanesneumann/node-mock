const { request } = require("express");
const express = require("express");
const proxy = require("express-http-proxy");
const app = express();

app.get("/api/tenants", (req, res) => {
  res.send("mock tenant");
});
app.use("/", proxy("http://localhost:8080"));

app.listen(3000);
