import express from "express";
import { pool } from "../db.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// GET all dishes
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM dishes");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// GET single dish by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM dishes WHERE id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ error: "Dish not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// POST a new dish
router.post("/", upload.single("image"), async (req, res) => {
  const { dish_name, cuisine, dish_details, restaurant_name, restaurant_address } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  const sql = `
    INSERT INTO dishes
    (dish_name, cuisine, dish_details, restaurant_name, restaurant_address, image_url)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  try {
    const [result] = await pool.query(sql, [
      dish_name,
      cuisine,
      dish_details,
      restaurant_name,
      restaurant_address,
      image_url,
    ]);

    // Return the inserted row with its ID
    const [newRow] = await pool.query("SELECT * FROM dishes WHERE id = ?", [result.insertId]);
    res.status(201).json(newRow[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add dish" });
  }
});

// PUT to update a dish
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { dish_name, cuisine, dish_details, restaurant_name, restaurant_address } = req.body;

  const sql = `
    UPDATE dishes
    SET dish_name=?, cuisine=?, dish_details=?, restaurant_name=?, restaurant_address=?
    WHERE id=?
  `;

  try {
    const [result] = await pool.query(sql, [
      dish_name,
      cuisine,
      dish_details,
      restaurant_name,
      restaurant_address,
      id,
    ]);

    if (result.affectedRows === 0) return res.status(404).json({ error: "Dish not found" });

    const [updatedRow] = await pool.query("SELECT * FROM dishes WHERE id = ?", [id]);
    res.json(updatedRow[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update dish" });
  }
});

// DELETE a dish
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM dishes WHERE id = ?", [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Dish not found" });
    res.json({ message: "Dish deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete dish" });
  }
});

export default router;
