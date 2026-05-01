import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "PLibor0301",
  port: 5432,
});

db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const result = await db.query("SELECT country_code FROM visited_countries");
  //console.log(result.rows);
  let countries = [];
  result.rows.forEach((c) => {
    countries.push(c.country_code);
  });
  //console.log(countries);
  res.render("index.ejs", { countries: countries, total: result.rows.length });
});

app.post("/add", async (req, res) => {
  try {
    let countryName = req.body.country;
    const countryCodes = await db.query("SELECT country_code FROM countries WHERE country_name = $1", [countryName]);
    if (countryCodes.rows.length === 0) {
      return res.status(400).send("Country does not exist in the database");
    }
    const countryCode = countryCodes.rows[0].country_code;
    let existingCountries = await db.query("SELECT country_code FROM visited_countries WHERE country_code = $1", [countryCode]);
    if (existingCountries.rows.length > 0) {
      return res.status(400).send("Country has already been added to visited countries");
    }
    await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [countryCode]);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
