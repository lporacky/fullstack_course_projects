import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "PLibor0301",
  port: 5432,
});
db.connect();

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  let password = req.body.password;
  let username = req.body.username;
  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [username]);
    if (checkResult.rows.length > 0) {
      res.send("Username already exists. Try logging in.");
    } else {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          console.log(err);
          res.send("Error hashing password. Please try again.");
        } else {
          const result = await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", 
        [username, hash]);
      console.log(result);
      res.render("secrets.ejs");
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  let password = req.body.password;
  let username = req.body.username;
  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [username]);

    if(checkResult.rows.length > 0) {
      const user = checkResult.rows[0];
       bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.log(err);
          res.send("Error comparing passwords. Please try again.");
        } else if (result) {
          res.render("secrets.ejs");
        } else {
          res.send("Incorrect password. Try again.");
        }
      });
    } else {
      res.send("Username not found. Please register first.");
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
