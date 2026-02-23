import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DishDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dish, setDish] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch dish data when component mounts
  useEffect(() => {
    fetch(`http://localhost:3000/api/dishes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDish(data);
        setFormData({
          dish_name: data.dish_name,
          cuisine: data.cuisine,
          dish_details: data.dish_details,
          restaurant_name: data.restaurant_name,
          restaurant_address: data.restaurant_address,
          origin: data.origin || 'restaurant'
        });
        setImagePreview(data.image_url ? `http://localhost:3000${data.image_url}` : null);
      })
      .catch((err) => console.error("Error fetching dish:", err));
  }, [id]);

  if (!dish) return <p>Loading...</p>;

  // Handle form changes in edit mode
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setFormData({ ...formData, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  // Save edited dish
  const handleSave = async () => {
    try {
      let res;
      // If a new image File is present, send multipart/form-data
      if (formData.image && formData.image instanceof File) {
        const payload = new FormData();
        payload.append('dish_name', formData.dish_name || '');
        payload.append('cuisine', formData.cuisine || '');
        payload.append('dish_details', formData.dish_details || '');
        payload.append('restaurant_name', formData.restaurant_name || '');
        payload.append('restaurant_address', formData.restaurant_address || '');
        payload.append('origin', formData.origin || 'restaurant');
        payload.append('image', formData.image);

        res = await fetch(`http://localhost:3000/api/dishes/${id}`, {
          method: 'PUT',
          body: payload,
        });
      } else {
        res = await fetch(`http://localhost:3000/api/dishes/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, origin: formData.origin || 'restaurant' }),
        });
      }

      if (!res.ok) throw new Error('Failed to update dish');
      const updatedDish = await res.json();
      setDish(updatedDish);
      setIsEditing(false);
      setImagePreview(updatedDish.image_url ? `http://localhost:3000${updatedDish.image_url}` : null);
    } catch (err) {
      console.error(err);
      alert('Error updating dish');
    }
  };

  // Delete dish
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this dish?")) return;
    try {
      const res = await fetch(`http://localhost:3000/api/dishes/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete dish");
      navigate("/"); // back to gallery
    } catch (err) {
      console.error(err);
      alert("Error deleting dish");
    }
  };

  return (
    <div className="dish-detail-container">
      {isEditing ? (
        <div className="dish-edit-form">
          <h2>Edit Dish</h2>

          <label>Upload Photo</label>
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="dish-image" />
          ) : (
            <div className="image-box placeholder">+</div>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />

          <label>Dish Name</label>
          <input
            name="dish_name"
            value={formData.dish_name}
            onChange={handleChange}
          />

          <label>Cuisine</label>
          <input name="cuisine" value={formData.cuisine} onChange={handleChange} />

          <label>Dish Details</label>
          <textarea
            name="dish_details"
            value={formData.dish_details}
            onChange={handleChange}
          />

          <label>Dish Type</label>
          <div>
            <label>
              <input
                type="radio"
                value="restaurant"
                checked={formData.origin === 'restaurant'}
                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
              />
              Restaurant
            </label>
            <label>
              <input
                type="radio"
                value="home"
                checked={formData.origin === 'home'}
                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
              />
              Home Made
            </label>
          </div>

          {formData.origin === 'restaurant' && (
            <>
              <label>Restaurant Name</label>
              <input
                name="restaurant_name"
                value={formData.restaurant_name}
                onChange={handleChange}
              />
              <label>Restaurant Address</label>
              <input
                name="restaurant_address"
                value={formData.restaurant_address}
                onChange={handleChange}
              />
            </>
          )}

          <div className="form-actions">
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="dish-view">
          <h2>{dish.dish_name}</h2>
          {dish.image_url && (
            <img
              src={`http://localhost:3000${dish.image_url}`}
              alt={dish.dish_name}
              className="dish-image"
            />
          )}
          <p><strong>Cuisine:</strong> {dish.cuisine}</p>
          <p><strong>Details:</strong> {dish.dish_details}</p>
          <p><strong>Type:</strong> {dish.origin === 'home' ? 'Home Made' : 'Restaurant'}</p>
          {dish.origin === 'restaurant' && (
            <>
              <p><strong>Restaurant:</strong> {dish.restaurant_name}</p>
              <p><strong>Address:</strong> {dish.restaurant_address}</p>
            </>
          )}
        

          <div className="dish-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete} style={{ marginLeft: "10px" }}>
              Delete
            </button>
            <button onClick={() => navigate("/")} style={{ marginLeft: "10px" }}>
              Back to Gallery
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
