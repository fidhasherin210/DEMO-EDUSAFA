import React, { useState } from "react";
import AddNoticePrinci from "./addNotice/AddNoticePrinci";
import AddGalleryPrinci from "./Add Gallery/AddGalleryPrinci";
import { Camera } from "lucide-react";

function EventsPrinci() {
  const [activeForm, setActiveForm] = useState("gallery"); // gallery | notice
  const [message, setMessage] = useState(""); // now properly used

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="mx-auto p-1">

        {/* Header */}
        <div className="px-4 mb-3 py-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-sky-500">
          <div className="mx-auto ">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white md:text-xl">
                  School Gallery & Notices
                </h1>
                <p className="text-xs text-white/90">
                  Manage gallery and school notices
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Toggle Buttons */}
        <div className="flex justify-center mb-4">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200 inline-flex">

            {/* Add Gallery Button */}
            <button
              className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ease-in-out transform ${
                activeForm === "gallery"
                  ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg scale-105"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
              onClick={() => setActiveForm("gallery")}
            >
              <span className="text-xs flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Add Gallery
              </span>
            </button>

            {/* Add Notice Button */}
            <button
              className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ease-in-out transform ${
                activeForm === "notice"
                  ? "bg-gradient-to-r from-sky-600 to-sky-500 text-white shadow-lg scale-105"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
              onClick={() => setActiveForm("notice")}
            >
              <span className="text-xs flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                  />
                </svg>
                Add Notice
              </span>
            </button>
          </div>
        </div>

        {/* Success / Error Message */}
        {message && (
          <div className="max-w-2xl mx-auto mb-4">
            <div className="p-3 rounded-lg bg-green-100 text-green-700 text-sm shadow">
              {message}
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="relative max-w-4xl mx-auto">

          {/* Gallery Form */}
          <div
            className={`transition-all duration-500 ease-in-out transform ${
              activeForm === "gallery"
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
            }`}
          >
            {activeForm === "gallery" && (
              <AddGalleryPrinci setMessage={setMessage} />
            )}
          </div>

          {/* Notice Form */}
          <div
            className={`transition-all duration-500 ease-in-out transform ${
              activeForm === "notice"
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
            }`}
          >
            {activeForm === "notice" && (
              <AddNoticePrinci setMessage={setMessage} />
            )}
          </div>

        </div>
      </div>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
}

export default EventsPrinci;
