import { useEffect, useState } from "react";
import api from "../api";

export default function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [allHotels, setAllHotels] = useState([]); // keep original list

  const fetchHotels = async () => {
    const res = await api.get("/hotels");
    console.log("Hotels from API:", res.data); // 👀 check backend data
    setHotels(res.data);
    setAllHotels(res.data);
  };

  const handleDelete = async (id) => {
    await api.delete(`/hotels/${id}`);
    fetchHotels();
  };

  const handleUpdate = async (id) => {
    const newName = prompt("Enter new name:");
    if (newName) {
      await api.put(`/hotels/${id}`, {
        ...hotels.find((h) => h.hotelId === id),
        name: newName,
      });
      fetchHotels();
    }
  };

  // 🔹 filter buttons
  const handleFilter = (type) => {
    if (type === "az") {
      setHotels([...allHotels].sort((a, b) => a.name.localeCompare(b.name)));
    } else if (type === "today") {
      const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
      const filtered = allHotels.filter((h) => {
        if (!h.createdAt) return false;

        // Normalize both "YYYY-MM-DDTHH:mm:ss" and "YYYY-MM-DD HH:mm:ss"
        const dateOnly =
          h.createdAt.split("T")[0] || h.createdAt.split(" ")[0];

        return dateOnly === today;
      });
      setHotels(filtered);
    } else {
      setHotels(allHotels); // reset
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Hotel List</h2>

      {/* 🔹 Filter Buttons */}
      <div className="space-x-2 mb-4">
        <button
          onClick={() => handleFilter("az")}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Sort A–Z
        </button>
        <button
          onClick={() => handleFilter("today")}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Today Uploads
        </button>
        <button
          onClick={() => handleFilter("reset")}
          className="bg-gray-500 text-white px-3 py-1 rounded"
        >
          Reset
        </button>
      </div>

      {/* 🔹 Hotel List */}
      <ul className="space-y-2">
        {hotels.map((h) => (
          <li
            key={h.hotelId}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>
              {h.name} ({h.location}) ⭐ {h.rating} — Team: {h.teamInCharge}
              <br />
              <small className="text-gray-500">
                Uploaded: {h.createdAt || "N/A"}
              </small>
            </span>
            <div>
              <button
                onClick={() => handleUpdate(h.hotelId)}
                className="bg-yellow-400 text-black px-2 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(h.hotelId)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
