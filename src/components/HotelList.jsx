import { useEffect, useState } from "react";
import api from "../api";

export default function HotelList() {
  const [hotels, setHotels] = useState([]);

  const fetchHotels = async () => {
    const res = await api.get("/hotels");
    setHotels(res.data);
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

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Hotel List</h2>
      <ul className="space-y-2">
        {hotels.map((h) => (
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
