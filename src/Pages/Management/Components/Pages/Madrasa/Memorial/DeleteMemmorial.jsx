import React, { useState } from "react";
import { Trash2 } from 'lucide-react'

function DeleteMemorial() {
  // Sample memorial data
  const [memorials, setMemorials] = useState([
   {
      id: 1,
      name: "Ustadh Abdul Rahman Al-Qasim",
      place: "Makkah, Saudi Arabia",
      date_of_death: "January 15, 2024",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop" // Beautiful beach sunset
    },
    {
      id: 2,
      name: "Sheikhah Fatima bint Yusuf",
      place: "Madinah, Saudi Arabia",
      date_of_death: "March 22, 2024",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=400&fit=crop" // Misty mountains
    },
    {
      id: 3,
      name: "Hafiz Muhammad Abdullah",
      place: "Istanbul, Turkey",
      date_of_death: "February 8, 2024",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop" // Sun rays through forest
    },
    {
      id: 4,
      name: "Umm Aisha Khatoon",
      place: "Cairo, Egypt",
      date_of_death: "April 5, 2024",
      image: "https://images.unsplash.com/photo-1431794062232-2a99a5431c6c?w=400&h=400&fit=crop" // Waterfall
    },
    {
      id: 5,
      name: "Qari Ibrahim Khalil",
      place: "Damascus, Syria",
      date_of_death: "March 12, 2024",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop" // Sunrise over mountains
    },
    {
      id: 6,
      name: "Muhaddithah Zainab Al-Maliki",
      place: "Fez, Morocco",
      date_of_death: "January 30, 2024",
      image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=400&h=400&fit=crop" // Desert sunset
    },
    {
      id: 7,
      name: "Maulana Yusuf Al-Hassan",
      place: "Kabul, Afghanistan",
      date_of_death: "February 18, 2024",
      image: "https://images.unsplash.com/photo-1490682143684-14369e18dce8?w=400&h=400&fit=crop" // Mountain lake
    },
    
    {
      id: 9,
      name: "Shaykh Bilal Al-Maghribi",
      place: "Rabat, Morocco",
      date_of_death: "November 12, 2023",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop" // Sunset horizon
    },
    

  ]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Helper to get image URL
  const getImageUrl = (url) => url;

  // ✅ Handle Delete request
  const handleDelete = async (memorialId) => {
    if (!window.confirm("Are you sure you want to delete this memorial?"))
      return;

    setLoading(true);
    setMessage("");

    // Simulate API delay
    setTimeout(() => {
      try {
        setMessage("Memorial deleted successfully.");
        setMemorials(memorials.filter((m) => m.id !== memorialId));
        
        // Clear message after 3 seconds
        setTimeout(() => {
          setMessage("");
        }, 3000);
      } catch (error) {
        setMessage("Something went wrong. Please try again.");
        
        // Clear message after 3 seconds
        setTimeout(() => {
          setMessage("");
        }, 3000);
      } finally {
        setLoading(false);
      }
    }, 500); // Simulate network delay
  };

  return (
    <div className="max-w-8xl mx-auto p-1 mt-3">
      <h2 className="text-sm md:text-xl font-bold mb-6 text-center text-blue-600">
        Memorials
      </h2>

      {/* ✅ Status message */}
      {message && (
        <div className="mb-6 text-center p-3 bg-green-100 text-green-800 rounded shadow-sm">
          {message}
        </div>
      )}

      {/* ✅ Show memorial list */}
      {memorials.length === 0 ? (
        <p className="text-center text-gray-500">No memorials found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          {memorials.map((memorial) => (
            <div
              key={memorial.id}
              className="flex items-center justify-between bg-gray-50 p-4 rounded-xl shadow-sm"
            >
              <div className="flex items-center gap-3">
                <img
                  src={getImageUrl(memorial.image)}
                  alt={memorial.name}
                  className="w-14 h-14 object-cover rounded-full"
                />
                <div>
                  <p className="text-xs font-semibold">{memorial.name}</p>
                  <p className="text-xs text-gray-600">{memorial.place}</p>
                  <p className="text-xs text-gray-500">{memorial.date_of_death}</p>
                </div>
              </div>

              <button
                onClick={() => handleDelete(memorial.id)}
                disabled={loading}
                className={`min-w-[48px] min-h-[48px] flex items-center justify-center bg-red-100 text-red-600 rounded-xl active:scale-95 transition ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DeleteMemorial;