export default function Header() {
  return (
    <header className="header-top">
      <div>
        <h1><i>That One Dish</i></h1>

        <div className="nav-tabs">
          <button className="tab-btn">Personal Page</button>
          <button className="tab-btn">Restaurant Dishes</button>
        </div>
      </div>

      <button className="add-btn">+</button>
    </header>
  );
}
