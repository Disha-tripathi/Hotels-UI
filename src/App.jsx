import HotelForm from "./components/HotelForm";
import HotelList from "./components/HotelList";
import { useState } from "react";

export default function App() {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => setRefresh(!refresh);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Hotel Manager</h1>
      <HotelForm onSuccess={handleRefresh} />
      <hr className="my-4" />
      <HotelList key={refresh} />
    </div>
  );
}
