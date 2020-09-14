const loaded = require("dotenv").config();
loaded.PROXY_TO;
const { request } = require("express");
const express = require("express");
const proxy = require("express-http-proxy");
const app = express();

app.get("/api/tenants", (req, res) => {
  res.send("mock tenant");
});
app.use("/", proxy(process.env.PROXY_TO));

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Mock running on port ${port}`);
