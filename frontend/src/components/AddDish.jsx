import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddDish() {
  const [formData, setFormData] = useState({
    dish_name: "",
    cuisine: "",
    dish_details: "",
    restaurant_name: "",
    restaurant_address: "",
    image_url: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/dishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Failed to add dish");

      alert("Dish added!");

      // Redirect back to Gallery page
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error adding dish");
    }
  };

  return (
    <div>
      <h2>Add a Dish</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="dish_name"
          placeholder="Dish name"
          onChange={handleChange}
          required
        />
        <input name="cuisine" placeholder="Cuisine" onChange={handleChange} />
        <input
          name="restaurant_name"
          placeholder="Restaurant name"
          onChange={handleChange}
        />
        <input
          name="restaurant_address"
          placeholder="Restaurant address"
          onChange={handleChange}
        />
        <textarea
          name="diah_details"
          placeholder="Dish details"
          onChange={handleChange}
        />
        <input
          name="image_url"
          placeholder="Image URL"
          onChange={handleChange}
        />

        <button className="submitDish" type="submit">
          Add Dish
        </button>
      </form>

      {formData.image_url && (
        <img
          src={formData.image_url}
          alt="Dish preview"
          style={{ width: "200px", marginTop: "10px" }}
        />
      )}
    </div>
  );
}

export default AddDish;
