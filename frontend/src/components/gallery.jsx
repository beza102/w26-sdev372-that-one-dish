import { useEffect, useState } from "react";

export default function Gallery() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/dishes")
      .then((res) => res.json())
      .then((data) => setDishes(data))
      .catch((err) => console.error("Error fetching dishes:", err));
  }, []);

  return (
    <div className="gallery-grid">
      {dishes.length === 0 && (
        <p className="placeholder-text">No dishes yet. Add one!</p>
      )}

      {dishes.map((dish) => (
        <div key={dish.id} className="dish-card">
          <h3>{dish.dish_name}</h3>

          {dish.image_url && (
            <img
              src={`http://localhost:3000${dish.image_url}`}
              alt={dish.dish_name}
              style={{ width: "100%", borderRadius: "8px" }}
            />
          )}

          <p><strong>Cuisine:</strong> {dish.cuisine}</p>
          <p><strong>Restaurant:</strong> {dish.restaurant_name}</p>
          <p>{dish.dish_details}</p>
        </div>
      ))}
    </div>
  );
}
