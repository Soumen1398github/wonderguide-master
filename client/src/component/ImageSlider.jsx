import React, { useEffect, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D",
  "https://img.peapix.com/5714e0a960724f3c9544e40910ee92a4_480.jpg",
  "https://in.musafir.com/uploads/1_61f7132a50.jpg",
  "https://amazingarchitecture.com/storage/files/1/Articles/suneet-paul/goa/beach_landscape.jpg",
  "https://hips.hearstapps.com/hmg-prod/images/switzerland-in-winter-1658924602.jpg?crop=0.8890666666666666xw:1xh;center,top&resize=1200:*",
  
];

function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      prevSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full mx-auto px-4 py-2">
      <div className="relative md:h-96 overflow-hidden rounded-lg">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-2000 ease-in-out ${
              currentIndex === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/30 backdrop-blur-lg p-2 rounded-full shadow-md hover:bg-white/50 transition z-10"
      >
        ❮
      </button>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/30 backdrop-blur-lg p-2 rounded-full shadow-md hover:bg-white/50 transition z-10"
      >
        ❯
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-white" : "bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;
