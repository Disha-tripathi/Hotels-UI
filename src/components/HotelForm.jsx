import { useState } from "react";
import api from "../api";

export default function HotelForm({ onSuccess }) {
  const [form, setForm] = useState({ name: "", location: "", rating: "", teamInCharge: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/hotels", {
      name: form.name,
      location: form.location,
      rating: parseInt(form.rating),
      teamInCharge: form.teamInCharge,
    });
    setForm({ name: "", location: "", rating: "", teamInCharge: "" });
    onSuccess(); // refresh list
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 border p-4 rounded-lg">
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border p-2 w-full" />
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} className="border p-2 w-full" />
      <input name="rating" placeholder="Rating" value={form.rating} onChange={handleChange} className="border p-2 w-full" />
      <input name="teamInCharge" placeholder="Team In Charge" value={form.teamInCharge} onChange={handleChange} className="border p-2 w-full" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Hotel</button>
    </form>
  );
}
