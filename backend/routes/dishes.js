import express from "express";
import { db } from "../db.js";
import multer from "multer";
import path from "path";
import mysql from "mysql2/promise";

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

router.post("/", upload.single("image"), async (req, res) => {
  const { dish_name, cuisine, dish_details, restaurant_name, restaurant_address } =
    req.body;

  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  const sql = `
    INSERT INTO dishes
    (dish_name, cuisine, dish_details, restaurant_name, restaurant_address, image_url)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  try {
    await db.query(sql, [
      dish_name,
      cuisine,
      dish_details,
      restaurant_name,
      restaurant_address,
      image_url,
    ]);

    res.status(201).json({ message: "Dish added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add dish" });
  }
});

export default router;
