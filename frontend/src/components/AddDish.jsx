import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AddDish() {
  const [formData, setFormData] = useState({
    dish_name: "",
    cuisine: "",
    dish_details: "",
    restaurant_name: "",
    restaurant_address: "",
    image: null
  });

  const [origin, setOrigin] = useState("restaurant");

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (origin === "home") {
      setFormData((prev) => ({
        ...prev,
        restaurant_name: "",
        restaurant_address: ""
      }));
    }
  }, [origin]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({
        ...formData,
        image: e.target.files[0]
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();

    formPayload.append("dish_name", formData.dish_name);
    formPayload.append("cuisine", formData.cuisine);
    formPayload.append("dish_details", formData.dish_details);
    formPayload.append("restaurant_name", formData.restaurant_name);
    formPayload.append("restaurant_address", formData.restaurant_address);

    if (formData.image) {
      formPayload.append("image", formData.image);
    }

    try {

      const res = await fetch("http://localhost:3000/api/dishes", {
        method: "POST",
        body: formPayload
      });

      if (!res.ok) throw new Error("Failed to add dish");

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        navigate("/");
      }, 2000);

    } catch (err) {
      console.error(err);
      alert("Error adding dish");
    }
  };

  return (
    <div className="add-dish-container">
      <h2 className="form-title">Add a New Favorite Dish</h2>

      <form onSubmit={handleSubmit} className="dish-form">
        <div className="form-group">
          <label>Dish Name</label>
          <input
            name="dish_name"
            placeholder="e.g. Cheese Burger"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Cuisine</label>
            <input
              name="cuisine"
              placeholder="e.g. American, Italian, etc."
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Where did you have this dish?</label>

            <label>
              <input
                type="radio"
                value="restaurant"
                checked={origin === "restaurant"}
                onChange={() => setOrigin("restaurant")}
              />
              At a restaurant
            </label>

            <label>
              <input
                type="radio"
                value="home"
                checked={origin === "home"}
                onChange={() => setOrigin("home")}
              />
              Home made
            </label>

          </div>

        </div>

        {origin === "restaurant" && (
          <>
            <div className="form-group">
              <label>Restaurant Name</label>
              <input
                name="restaurant_name"
                placeholder="e.g. That One Place"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Restaurant Address</label>
              <input
                name="restaurant_address"
                placeholder="123 Street, City, State"
                onChange={handleChange}
              />
            </div>
          </>
        )}

        <div className="form-group">
          <label>Dish Details</label>
          <textarea
            name="dish_details"
            placeholder="What makes this dish so good?"
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="file-input"
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="button"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>

          <button className="button" type="submit">
            Add to Gallery
          </button>
        </div>
      </form>

      {showSuccess && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              onClick={() => navigate("/")}
            >
              x
            </button>
            <h3>Delicious!</h3>
            <p>Your dish has been added to the gallery.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddDish;