import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import ejs from "ejs";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "PLibor0301",
  port: 5432,
});
db.connect();
let items = [];

app.get("/", async (req, res) => {
  let newItems = await db.query("SELECT * FROM items ORDER BY id ASC");
  items = newItems.rows;
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  const id = await db.query("INSERT INTO items (title) VALUES ($1) RETURNING id", [item]);
  res.redirect("/");
});

app.post("/edit", (req, res) => {
  const id = req.body.updatedItemId;
  const item = req.body.updatedItemTitle;
  db.query("UPDATE items SET title = ($1) WHERE id = $2", [item, id]);
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const id = req.body.deleteItemId;
  await db.query("DELETE FROM items WHERE id = $1", [id]);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
