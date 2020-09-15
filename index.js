const loaded = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");
const monk = require("monk");

const db = monk(process.env.MONGO_URI);
const tenants = db.get("tenants");

if (loaded.error) {
  console.log("Error loading env:", loaded.error);
}

const port = process.env.PORT || 3000;
const proxyTo = process.env.PROXY_TO;

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN }));
// const router = express.Router();

app.get("/api/tenants", async (req, res, next) => {
  try {
    const items = await tenants.find({});
    res.json(items);
  } catch (error) {
    next(error);
  }
});

app.use("/", proxy(proxyTo));

app.listen(port);
console.log(`Mock running on port ${port}`);
