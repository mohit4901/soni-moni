import React from 'react'
import { assets } from '../assets/assets'
import Title from './Title'

const AboutSection = () => {
  return (
    <div className="w-full py-20 sm:py-24 relative overflow-hidden">

      {/* Decorative Elements — DESKTOP ONLY */}
      <div className="hidden md:block absolute left-24 top-1/2 w-3 h-3 bg-[#f39ab1] rounded-full"></div>
      <div className="hidden md:block absolute left-28 top-1/2 w-20 h-[1px] bg-[#f39ab1]"></div>

      <div className="
        max-w-[1300px] mx-auto
        flex flex-col-reverse md:flex-row
        items-center justify-between
        px-6 sm:px-10
        gap-14 md:gap-0
      ">

        {/* LEFT CONTENT */}
        <div className="w-full md:w-1/2 md:pr-20 text-center md:text-left">
          <Title text1="ABOUT" text2="US" />

          <p className="mt-6 sm:mt-8 text-sm text-gray-600 leading-7">
            We celebrate the beauty of Indian ethnic wear with timeless
            designs, rich fabrics, and handcrafted details. Every outfit
            is created to make you feel elegant, confident, and rooted
            in tradition.
          </p>

          <p className="mt-4 sm:mt-6 text-sm text-gray-600 leading-7">
            From everyday elegance to festive grandeur, our collections
            are thoughtfully curated to suit every occasion and every
            woman.
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="
            w-[260px] h-[260px]
            sm:w-[320px] sm:h-[320px]
            md:w-[420px] md:h-[420px]
            rounded-full overflow-hidden
            bg-[#f7c6d0]
          ">
            <img
              src={assets.logo}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </div>
  )
}

export default AboutSection
