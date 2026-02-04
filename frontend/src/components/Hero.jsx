import React, { useEffect, useState } from "react"
import { assets } from "../assets/assets"

const slides = [
  {
    img: assets.hero_bg,
    title: "New Arrival",
    subtitle: "Fresh Drops. Timeless Style",
    btn: "SHOP NOW",
  },
  {
    img: assets.hero_offer,
    title: "UP TO 30% OFF",
    subtitle: "On Selected Styles",
    btn: "SHOP SALE",
  },
  {
    img: assets.hero_suit,
    title: "SUITS UNDER ₹1500",
    subtitle: "Style That Fits Your Budget",
    btn: "EXPLORE SUITS",
  },
]

const Hero = () => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative w-full overflow-hidden">

      {/* Slider Container */}
      <div
        className="
          w-full
          overflow-hidden
          h-[56vw]
          sm:h-[70vh]
          lg:h-screen
        "
      >
        {/* Slides */}
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="min-w-full h-full relative"
            >
              {/* Image */}
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-[1400px] mx-auto px-6 sm:px-10 w-full">
                  <div className="max-w-xl">
                    <h1 className="prata-regular text-3xl sm:text-5xl lg:text-[56px] text-white leading-tight">
                      {slide.title}
                    </h1>

                    <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-white/90">
                      {slide.subtitle}
                    </p>

                    <button className="mt-6 sm:mt-8 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-white text-black text-xs sm:text-sm tracking-wide hover:bg-gray-100 transition">
                      {slide.btn}
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full ${
              current === i ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>

    </section>
  )
}

export default Hero
