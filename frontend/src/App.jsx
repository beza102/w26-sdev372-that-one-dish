import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Gallery from "./components/Gallery";
import AddDish from "./components/AddDish";

const BASE_PATH = "/that_one_dish";

export default function App() {
  return (
    <Router basename={BASE_PATH}>
      <div className="app-root">
        <Header />

        <Routes>
          <Route index element={<Gallery />} />
          <Route path="add-dish" element={<AddDish />} />
          <Route path="*" element={<h1>404 Page Not Found</h1>} />
          <Route path="/dishes/:id" element={<DishDetail />} />
        </Routes>
      </div>
    </Router>
  );
}
