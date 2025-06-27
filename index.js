const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());

app.get("/price", async (req, res) => {
  const symbol = (req.query.symbol || "BTCUSDT").toUpperCase();

  try {
    const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
    const data = await response.json();

    if (data.price) {
      res.set("Content-Type", "text/plain");
      res.send(data.price.toString());
    } else {
      res.status(400).send("Invalid symbol or Binance error.");
    }
  } catch (err) {
    res.status(500).send("Failed to fetch price.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy listening on ${PORT}`));
