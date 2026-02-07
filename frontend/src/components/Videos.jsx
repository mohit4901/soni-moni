import React, { useEffect, useRef, useState } from 'react';
import { videos } from '../assets/assets';
import Title from './Title';
import VideoCarousel from './VideoCarousel';

const Videos = () => {
  const scrollRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    
    const interval = setInterval(() => {
      container.scrollBy({
        left: 260,
        behavior: 'smooth',
      });
      
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 10
      ) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }, 2500);
    
    return () => clearInterval(interval);
  }, []);

  const handleVideoClick = (index) => {
    setSelectedVideo(index);
  };

  const handleCloseCarousel = () => {
    setSelectedVideo(null);
  };

  return (
    <section className="w-full py-20 bg-[#f7e9d6] overflow-hidden">
      {/* Title */}
      <div className="text-center mb-14">
        <Title text1="WATCH &" text2="BUY" />
      </div>
      
      {/* Auto Scroll Videos */}
      <div
        ref={scrollRef}
        className="flex gap-6 px-6 overflow-x-auto no-scrollbar scroll-smooth"
      >
        {[...videos, ...videos].map((video, index) => (
          <VideoCard 
            key={index} 
            src={video} 
            onClick={() => handleVideoClick(index % videos.length)}
          />
        ))}
      </div>
      
      {/* Show More Button */}
      <div className="mt-16 text-center">
        <a
          href="https://www.instagram.com/royalcollection___22?igsh=NXQzMm0wazcwYXBh&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-black px-10 py-3 text-sm tracking-wide hover:bg-black hover:text-white transition"
        >
          SHOW MORE ON INSTAGRAM
        </a>
      </div>

      {/* Full Screen Video Carousel */}
      {selectedVideo !== null && (
        <VideoCarousel 
          videos={videos}
          initialIndex={selectedVideo}
          onClose={handleCloseCarousel}
        />
      )}
    </section>
  );
};

/* VERTICAL VIDEO CARD (MOBILE FRIENDLY) */
const VideoCard = ({ src, onClick }) => (
  <div
    className="
      min-w-[200px]
      sm:min-w-[240px]
      md:min-w-[260px]
      flex justify-center
      cursor-pointer
      hover:opacity-90
      transition
    "
    onClick={onClick}
  >
    <div
      className="
        w-full
        aspect-[9/16]
        overflow-hidden
        rounded-xl
        shadow-lg
      "
    >
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover bg-black"
      />
    </div>
  </div>
);

export default Videos;
