router.post("/", async (req, res) => {
  const {
    dish_name,
    cuisine,
    dish_details,
    restaurant_name,
    restaurant_address,
    image_url
  } = req.body;

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
      image_url
    ]);
    res.status(201).json({ message: "Dish added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add dish" });
  }
});
