import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Gallery from "./components/Gallery";
import AddDish from "./components/AddDish";

export default function App() {
  return (
    <Router>
      <div className="app-root">
        <Header />

        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/add-dish" element={<AddDish />} />
          <Route path="*" element={<h1>404 Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}
