import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HotelForm from "./components/HotelForm";
import HotelList from "./components/HotelList";
import { useState } from "react";

export default function App() {
  const [refresh, setRefresh] = useState(false);
  const handleRefresh = () => setRefresh(!refresh);

  return (
    <Router>
      <div className="p-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Hotel Manager</h1>

        {/* Navigation */}
        <nav className="mb-6 flex gap-4">
          <Link to="/form" className="text-blue-600 hover:underline">Add Hotel</Link>
          <Link to="/list" className="text-blue-600 hover:underline">Hotel List</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/form" element={<HotelForm onSuccess={handleRefresh} />} />
          <Route path="/list" element={<HotelList key={refresh} />} />
          <Route path="/" element={<HotelList key={refresh} />} /> {/* default page */}
        </Routes>
      </div>
    </Router>
  );
}
