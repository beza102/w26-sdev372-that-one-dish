import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddDish() {
  const [formData, setFormData] = useState({
    dish_name: "",
    cuisine: "",
    dish_details: "",
    restaurant_name: "",
    restaurant_address: "",
    image: null
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

      alert("Dish added!");
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

        <input
          name="cuisine"
          placeholder="Cuisine"
          onChange={handleChange}
        />

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
          name="dish_details"
          placeholder="Dish details"
          onChange={handleChange}
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.files[0] })
          }
        />

        <button className="submitDish" type="submit">
          Add Dish
        </button>
      </form>
    </div>
  );
}

export default AddDish;
