export default function Header() {
  return (
    <header className="header-top">
      <div>
        <h1><i>That One Dish</i></h1>

        <div className="nav-tabs">
          <button className="tab">Personal Page</button>
          <button className="tab">Restaurant Dishes</button>
        </div>
      </div>

      <button className="addButton">+</button>
    </header>
  );
}
