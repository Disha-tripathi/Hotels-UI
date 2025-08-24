import { useEffect, useState } from "react";
import api from "../api";

export default function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);

  const fetchHotels = async () => {
    const res = await api.get("/hotels");
    setHotels(res.data);
    setFilteredHotels(res.data); // keep original & filtered copy
  };

  const handleDelete = async (id) => {
    await api.delete(`/hotels/${id}`);
    fetchHotels();
  };

  const handleUpdate = async (id) => {
    const newName = prompt("Enter new name:");
    if (newName) {
      await api.put(`/hotels/${id}`, { ...hotels.find(h => h.hotelId === id), name: newName });
      fetchHotels();
    }
  };

  // Sorting A-Z
  const sortAZ = () => {
    const sorted = [...filteredHotels].sort((a, b) => a.name.localeCompare(b.name));
    setFilteredHotels(sorted);
  };

  // Sorting Z-A
  const sortZA = () => {
    const sorted = [...filteredHotels].sort((a, b) => b.name.localeCompare(a.name));
    setFilteredHotels(sorted);
  };

  // Filter by today's upload
  const filterToday = () => {
    const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
    const filtered = hotels.filter(h => h.createdAt?.startsWith(today));
    setFilteredHotels(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setFilteredHotels(hotels);
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Hotel List</h2>

      {/* Filter buttons */}
      <div className="mb-4 space-x-2">
        <button onClick={sortAZ} className="bg-blue-500 text-white px-3 py-1 rounded">A → Z</button>
        <button onClick={sortZA} className="bg-blue-500 text-white px-3 py-1 rounded">Z → A</button>
        <button onClick={filterToday} className="bg-green-500 text-white px-3 py-1 rounded">Today Upload</button>
        <button onClick={resetFilters} className="bg-gray-500 text-white px-3 py-1 rounded">Reset</button>
      </div>

      <ul className="space-y-2">
        {filteredHotels.map((h) => (
          <li key={h.hotelId} className="flex justify-between items-center border p-2 rounded">
            <span>{h.name} ({h.location}) ⭐ {h.rating} — Team: {h.teamInCharge}</span>
            <div>
              <button onClick={() => handleUpdate(h.hotelId)} className="bg-yellow-400 text-black px-2 py-1 rounded mr-2">Edit</button>
              <button onClick={() => handleDelete(h.hotelId)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
