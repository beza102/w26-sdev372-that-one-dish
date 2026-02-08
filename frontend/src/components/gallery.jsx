import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Gallery() {
  const [dishes, setDishes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/dishes")
      .then((res) => res.json())
      .then((data) => setDishes(data))
      .catch((err) => console.error("Error fetching dishes:", err));
  }, []);

  return (
    <div className="gallery-container">
      <h2 className="gallery-title">Dish Gallery</h2>

      {dishes.length === 0 && (
        <p className="placeholder-text">No dishes yet. Add one!</p>
      )}

      <div className="gallery-grid">
        {dishes.map((dish) => (
          <div
            key={dish.id}
            className="dish-card clickable"
            onClick={() => navigate(`/dishes/${dish.id}`)}
          >
            <div className="card-image-container">
              {dish.image_url && (
                <img
                  src={`http://localhost:3000${dish.image_url}`}
                  alt={dish.dish_name}
                  className="dish-image"
                />
              )}
              <span className="cuisine-badge">{dish.cuisine || "Tasty"}</span>
            </div>

            <div className="card-content">
              <h3 className="dish-name">{dish.dish_name}</h3>
              <p className="restaurant-info">
                <strong>{dish.restaurant_name}</strong>
              </p>
              <p className="restaurant-address">{dish.restaurant_address}</p>
              <hr className="divider" />
              <p className="dish-description">{dish.dish_details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
