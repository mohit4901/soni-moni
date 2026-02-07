import React from "react"
import { assets } from "../assets/assets"
import Title from "./Title"
import { useNavigate } from "react-router-dom"

const Categories = () => {

  const navigate = useNavigate()

  const handleCategoryClick = (category) => {
    navigate(`/collection?category=${category}`)
  }

  return (
    <section className="w-full py-12 sm:py-20">

      {/* Section Title */}
      <div className="text-center">
        <Title text1="SHOP BY" text2="FABRIC" />
      </div>

      {/* Categories Grid */}
      <div
        className="
          mt-10
          grid
          grid-cols-3
          sm:grid-cols-3
          md:grid-cols-5
          gap-y-8
          gap-x-4
          place-items-center
          px-4
        "
      >
        <CategoryCard
          img={assets.morgan}
          label="ORGANZA"
          onClick={() => handleCategoryClick('kurti')}
        />
        <CategoryCard
          img={assets.msilk}
          label="SILK"
          onClick={() => handleCategoryClick('lehenga')}
        />
        <CategoryCard
          img={assets.mgeor}
          label="GEORGETTE"
          onClick={() => handleCategoryClick('saree')}
        />
        <CategoryCard
          img={assets.mlinen}
          label="LINEN"
          onClick={() => handleCategoryClick('gown')}
        />
        <CategoryCard
          img={assets.category_suit}
          label="COTTON"
          onClick={() => handleCategoryClick('suit')}
        />
         <CategoryCard
          img={assets.mbur}
          label="BURBERRY"
          onClick={() => handleCategoryClick('suit')}
        />
      </div>
    </section>
  )
}

/* 🔹 Reusable Card (UI SAME) */
const CategoryCard = ({ img, label, onClick }) => (
  <div
    onClick={onClick}
    className="flex flex-col items-center group cursor-pointer"
  >

    {/* Circle */}
    <div
      className="
        w-20 h-20
        sm:w-28 sm:h-28
        md:w-32 md:h-32
        lg:w-36 lg:h-36
        rounded-full
        overflow-hidden
        border border-[#b64400]
        bg-[#f6c1cc]
        transition
        duration-300
        group-hover:scale-105
      "
    >
      <img
        src={img}
        alt={label}
        className="w-full h-full object-cover"
      />
    </div>

    {/* Text */}
    <p className="mt-3 text-[10px] sm:text-sm tracking-widest font-medium">
      {label}
    </p>

  </div>
)

export default Categories
