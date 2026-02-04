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
        left: 320,
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
    <section className="w-full py-24 bg-[#f7e9d6] overflow-hidden">

      {/* Title */}
      <div className="text-center mb-14">
        <Title text1="OUR" text2="VIDEOS" />
      </div>

      {/* Auto Scroll Videos */}
      <div
        ref={scrollRef}
        className="flex gap-8 px-10 overflow-x-auto no-scrollbar scroll-smooth"
      >
        {/* videos loop */}
        {[...videos, ...videos].map((video, index) => (
          <VideoCard key={index} src={video} />
        ))}
      </div>

      {/* Show More Button */}
      <div className="mt-16 text-center">
        <a
          href="https://www.instagram.com/monisoniroyalcollectionjhajjar/"
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

/* Video Card */
const VideoCard = ({ src }) => (
  <div className="min-w-[300px] flex flex-col items-center">
    <div className="relative w-full h-[260px] rounded-[22px] overflow-hidden">

      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />

    </div>
  </div>
)

export default Videos
