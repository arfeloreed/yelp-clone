import express from "express";
import cors from "cors";
import pg from "pg";
import "dotenv/config";

// variables
const app = express();
const port = process.env.SERVER_PORT;

// db setup
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
db.connect();

// middlewares
app.use(cors());
app.use(express.json());

// routes
// get all restaurants
app.get("/restaurants", async (req, res) => {
  try {
    // const result = await db.query("SELECT * FROM restaurants");
    const result = await db.query(
      "SELECT * FROM restaurants \
      LEFT JOIN (SELECT restaurant_id, COUNT(*) AS reviews, ROUND(AVG(rating), 1) \
      AS avg_rating FROM reviews GROUP BY restaurant_id) reviews \
      ON restaurants.id = reviews.restaurant_id"
    );
    const data = result.rows;

    res.json(data);
  } catch (err) {
    console.error("Internal server error.", err.message);
    res.status(500).send("Internal server error.");
  }
});

// get a restaurant
app.get("/restaurants/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // const resultRestau = await db.query("SELECT * FROM restaurants WHERE id = $1", [id]);
    const resultRestau = await db.query(
      "SELECT * FROM restaurants \
      LEFT JOIN (SELECT restaurant_id, COUNT(*) AS reviews, ROUND(AVG(rating), 1) AS avg_rating FROM reviews GROUP BY restaurant_id) reviews \
      ON restaurants.id = reviews.restaurant_id WHERE id = $1",
      [id]
    );
    const resultReviews = await db.query(
      "SELECT * FROM reviews where restaurant_id = $1",
      [id]
    );

    const data = {
      restaurant: resultRestau.rows[0],
      reviews: resultReviews.rows,
    };

    res.json(data);
  } catch (err) {
    console.error("Internal server error.", err.message);
    res.status(500).send("Internal server error.");
  }
});

// create or add a restaurant
app.post("/restaurants", async (req, res) => {
  try {
    const { name, location, price_range } = req.body;

    await db.query(
      "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3)",
      [name, location, price_range]
    );

    res.sendStatus(200);
  } catch (err) {
    console.error("Internal server error.", err.message);
    res.status(500).send("Internal server error.");
  }
});

// edit or update a restaurant
app.patch("/restaurants/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, price_range } = req.body;

    const res_query = await db.query("SELECT * FROM restaurants WHERE id = $1", [id]);
    const entry = res_query.rows[0];

    const result = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 \
      WHERE id = $4 RETURNING *",
      [
        name || entry.name,
        location || entry.location,
        price_range || entry.price_range,
        id,
      ]
    );
    const edited_entry = result.rows;

    res.json(edited_entry);
  } catch (err) {
    console.error("Internal server error.", err.message);
    res.status(500).send("Internal server error.");
  }
});

// delete a restaurant
app.delete("/restaurants/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM restaurants WHERE id = $1", [id]);

    res.sendStatus(200);
  } catch (err) {
    console.error("Internal server error.", err.message);
    res.status(500).send("Internal server error.");
  }
});

// create or add a review
app.post("/restaurants/:id/addReview", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, review, rating } = req.body;

    await db.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4)",
      [id, name, review, rating]
    );

    res.sendStatus(200);
  } catch (err) {
    console.error("Internal server error.", err.message);
    res.status(500).send("Internal server error.");
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
