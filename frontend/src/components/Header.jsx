import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="header-top">
      <div>
        <div className="title-with-logo">
          <img src={logo} alt="That One Dish logo" className="header-logo" />
          <h1><i>That One Dish</i></h1>
        </div>

        <div className="nav-tabs">
          <button className="tab">Personal Page</button>
          <button className="tab">Restaurant Dishes</button>
        </div>
      </div>

      <button
        className="addDishButton"
        onClick={() => navigate('/add-dish')}
      >
        +
      </button>
    </header>
  );
}
