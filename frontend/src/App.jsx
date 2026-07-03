import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DashBoard from "./pages/DashBoard";
import Login from './pages/Login'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App



// export default App
