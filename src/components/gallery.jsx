export default function Gallery() {
  return (
    <div className="gallery-grid">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="dish-card">
          <span className="placeholder-text">Dish</span>
        </div>
      ))}
    </div>
  );
}