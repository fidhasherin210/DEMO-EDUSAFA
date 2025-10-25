import React, { useEffect, useState } from "react";
import axios from "axios";

function DeleteMemorial() {
  const [memorials, setMemorials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [csrfToken, setCsrfToken] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // ✅ Fetch CSRF token when component mounts
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/authority/csrf-token/`, {
          credentials: "include",
        });
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error("Failed to fetch CSRF token:", error);
      }
    };
    fetchCsrfToken();
  }, [backendUrl]);

  // ✅ Fetch all memorials
  useEffect(() => {
    const fetchMemorials = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/authority/delete-memorial/`,
          { withCredentials: true }
        );
        setMemorials(response.data);
      } catch (error) {
        console.error("Failed to fetch memorials:", error);
      }
    };

    fetchMemorials();
  }, [backendUrl]);

  // ✅ Helper to get image URL
  const getImageUrl = (url) =>
    url?.startsWith("http") ? url : `${backendUrl}${url}`;

  // ✅ Handle Delete request
  const handleDelete = async (memorialId) => {
    if (!window.confirm("Are you sure you want to delete this memorial?"))
      return;

    if (!csrfToken) {
      alert("CSRF token missing. Please refresh the page and try again.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.delete(
        `${backendUrl}/api/authority/delete-memorial/${memorialId}/`,
        {
          withCredentials: true,
          headers: { "X-CSRFToken": csrfToken },
        }
      );

      setMessage(response.data.message || "Memorial deleted successfully.");
      setMemorials(memorials.filter((m) => m.id !== memorialId));
    } catch (error) {
      console.error("Delete failed:", error);
      if (error.response) {
        setMessage(error.response.data.error || "Failed to delete memorial.");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {memorials.map((memorial) => (
            <div
              key={memorial.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <div className="relative h-32 w-full">
                {memorial.image ? (
                  <img
                    src={getImageUrl(memorial.image)}
                    alt={memorial.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              <div className="p-3 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">
                  {memorial.name}
                </h3>
                <p className="text-gray-600 text-sm">{memorial.place}</p>
                <p className="text-gray-400 text-xs mb-3">
                  {memorial.date_of_death}
                </p>

                <button
                  onClick={() => handleDelete(memorial.id)}
                  disabled={loading}
                  className="mt-auto bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm focus:ring-2 focus:ring-red-300 focus:outline-none transition-colors"
                >
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DeleteMemorial;
