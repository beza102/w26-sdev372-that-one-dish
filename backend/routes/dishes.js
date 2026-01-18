import express from 'express';
import { db } from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM dishes');
  res.json(rows);
});

router.post('/', async (req, res) => {
  const {
    dish_name,
    cuisine,
    recipe_details,
    restaurant_name,
    restaurant_address,
    image_url
  } = req.body;

  const sql = `
    INSERT INTO dishes
    (dish_name, cuisine, recipe_details, restaurant_name, restaurant_address, image_url)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  await db.query(sql, [
    dish_name,
    cuisine,
    recipe_details,
    restaurant_name,
    restaurant_address,
    image_url
  ]);

  res.status(201).json({ message: 'Dish added' });
});

export default router;
