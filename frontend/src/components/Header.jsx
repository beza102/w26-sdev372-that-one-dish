import { useNavigate } from 'react-router-dom';
import HeaderLogo from '../../public/Header.png';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="header-top">
      <div>
        <img src={HeaderLogo} alt="That One Dish" className="header-logo" />

        <div className="nav-tabs">
          <button className="tab">Personal Page</button>
          <button className="tab">Restaurant Dishes</button>
        </div>
      </div>
    </header>
  );
}
