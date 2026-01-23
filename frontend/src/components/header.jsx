import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="header-top">
      <div>
        <h1><i>That One Dish</i></h1>

        <div className="nav-tabs">
          <button className="tab">Personal Page</button>
          <button className="tab">Restaurant Dishes</button>
        </div>
      </div>

      <button className="addDishButton" onClick={() => navigate('/add-dish')}>+</button>
    </header>
  );
}
