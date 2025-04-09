const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

let data = [];

app.get("/api/items", (req, res) => {
  res.json(data);
});

app.post("/api/items", (req, res) => {
  const newItem = req.body.item;
  if (newItem) {
    data.push(newItem);
    res.json({ message: "Item added!" });
  } else {
    res.status(400).json({ error: "Item is required" });
  }
});

app.listen(port, () => {
  console.log(`Backend API đang chạy tại http://localhost:${port}`);
});
