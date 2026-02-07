import React, { useEffect, useRef } from 'react'
import { videos } from '../assets/assets'
import Title from './Title'

const Videos = () => {
  const scrollRef = useRef(null)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const interval = setInterval(() => {
      container.scrollBy({
        left: 260,
        behavior: 'smooth',
      })

      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 10
      ) {
        container.scrollTo({ left: 0, behavior: 'smooth' })
      }
    }, 2500)

    return () => clearInterval(interval)
  }, [])

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
          <VideoCard key={index} src={video} />
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

    </section>
  )
}

/* 🔥 VERTICAL VIDEO CARD (MOBILE FRIENDLY) */
const VideoCard = ({ src }) => (
  <div
    className="
      min-w-[200px]
      sm:min-w-[240px]
      md:min-w-[260px]
      flex justify-center
    "
  >
    <div
      className="
        w-full
        aspect-[9/16]
        overflow-hidden
      "
    >
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-contain bg-black"
      />
    </div>
  </div>
)

export default Videos
