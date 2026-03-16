import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Upload,
  FileImage,
  Trash2,
  Camera,
  Book,
  Calendar,
} from "lucide-react";

function AddGalleryPrinci() {
  const [image, setImage] = useState(null);
  const [aboutEvents, setAboutEvents] = useState("");
  const [gallery, setGallery] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Sample gallery images data
  const sampleGallery = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Annual Sports Day 2024 - Students participating in various athletic events"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Science Exhibition - Students showcasing their innovative projects"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Cultural Fest 2024 - Traditional dance performance by students"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Graduation Day - Class of 2024 receiving their certificates"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Teacher's Day Celebration - Students honoring their teachers"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1503676260728-5177806622cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Educational Field Trip - Students visiting the science museum"
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Art Competition - Students displaying their creative artwork"
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Parent-Teacher Meeting - Discussing student progress"
    }
  ];

  const fetchImages = useCallback(async () => {
    // Simulate API call with timeout
    await new Promise(resolve => setTimeout(resolve, 500));
    setGallery(sampleGallery);
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImage(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      console.error("No image selected.");
      return;
    }

    setIsUploading(true);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Create new gallery item with sample image and user input
    const newGalleryItem = {
      id: gallery.length + 1,
      image: URL.createObjectURL(image),
      title: aboutEvents || "New event captured"
    };

    // Add to gallery
    setGallery(prevGallery => [newGalleryItem, ...prevGallery]);
    
    // Reset form
    setImage(null);
    setAboutEvents("");
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
    
    setIsUploading(false);
  };

  const handleDelete = async (imageId) => {
    // Simulate delete delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Remove from gallery
    setGallery(prevGallery => prevGallery.filter(item => item.id !== imageId));
  };

  const getImageUrl = (url) => {
    return url; // URLs are already complete from sample data
  };

  return (
    <div className="min-h-screen md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-7xl mx-auto space-y-8 mt-3">
          {/* Upload Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6">
              <h2 className="text-base md:text-xl font-bold text-white flex items-center gap-2">
                <Camera className="w-6 h-6" />
                Add New Gallery
              </h2>
            </div>

            {/* ✅ FIXED: Use <form> here */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* File Upload Area */}
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                  dragActive
                    ? "border-blue-400 bg-blue-50"
                    : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                  accept="image/*"
                  className="hidden"
                />

                {image ? (
                  <div className="space-y-4">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      className="mx-auto w-32 h-32 object-cover rounded-xl shadow-md"
                    />
                    <p className="text-sm font-medium text-gray-900">
                      {image.name}
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImage(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = null;
                        }
                      }}
                      className="text-red-600 hover:text-red-700 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <FileImage className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-900">
                        Drop your image here
                      </p>
                      <p className="text-gray-500">or click to browse</p>
                    </div>
                    <p className="text-sm text-gray-400">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                )}
              </div>

              {/* Event Description */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Book className="w-4 h-4" />
                  Event Description
                </label>
                <textarea
                  value={aboutEvents}
                  onChange={(e) => setAboutEvents(e.target.value)}
                  required
                  placeholder="Describe the event or occasion captured in this image..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isUploading || !image}
                className="w-full bg-gradient-to-r from-blue-600 to-sky-500 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Add to Gallery
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Gallery Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileImage className="w-6 h-6 text-indigo-600" />
                  <h2 className="text-base md:text-xl font-semibold text-blue-600">
                    Gallery Collection
                  </h2>
                </div>
              </div>
            </div>

            <div className="p-2 pt-4">
              {gallery.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-6">
                  {gallery.map((item, index) => (
                    <div
                      key={index}
                      className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.title}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-opacity-400 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="opacity-900 group-hover:opacity-900 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-all duration-200 transform scale-90 hover:scale-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start gap-2">
                          <Calendar className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {item.title || "No description available."}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <FileImage className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No images yet
                  </h3>
                  <p className="text-gray-500">
                    Start building your school&apos;s gallery by uploading the first
                    image!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddGalleryPrinci;