import React from "react"
import { assets } from "../assets/assets"
import Title from "./Title"
import { useNavigate } from "react-router-dom"

const Categories = () => {

  const navigate = useNavigate()

  /* 🔹 OLD CATEGORY CLICK (UNCHANGED) */
  const handleCategoryClick = (category) => {
    navigate(`/collection?category=${category}`)
  }

  /* 🔹 NEW FABRIC CLICK */
  const handleFabricClick = (subCategory) => {
    navigate(`/collection?subCategory=${subCategory}`)
  }

  return (
    <section className="w-full py-12 sm:py-20">

      <div className="text-center">
        <Title text1="OUR" text2="CATEGORIES" />
      </div>

      {/* 🔹 OLD CATEGORIES (UNCHANGED) */}
      <div className="
        mt-10 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5
        gap-y-8 gap-x-4 place-items-center px-4
      ">
        <CategoryCard img={assets.category_kurti} label="KURTIS"
          onClick={() => handleCategoryClick('Kurti')} />
        <CategoryCard img={assets.category_lehenga} label="LEHENGA"
          onClick={() => handleCategoryClick('Lehenga')} />
        <CategoryCard img={assets.category_saree} label="SAREES"
          onClick={() => handleCategoryClick('Saree')} />
        <CategoryCard img={assets.category_gown} label="GOWNS"
          onClick={() => handleCategoryClick('Gown')} />
        <CategoryCard img={assets.category_suit} label="SUITS"
          onClick={() => handleCategoryClick('Suit')} />
      </div>

      {/* 🔹 NEW FABRIC SECTION */}
      <div className="mt-20 text-center">
        <Title text1="SHOP BY" text2="FABRIC" />
      </div>

      <div className="
        mt-10 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6
        gap-y-10 gap-x-4 place-items-center px-4
      ">
        <FabricCard img={assets.msilk} label="SILK"
          onClick={() => handleFabricClick('Silk')} />
        <FabricCard img={assets.mgeor} label="GEORGETTE"
          onClick={() => handleFabricClick('Georgette')} />
        <FabricCard img={assets.morgan} label="ORGANZA"
          onClick={() => handleFabricClick('Organza')} />
        <FabricCard img={assets.mbur} label="BURBERRY"
          onClick={() => handleFabricClick('Burberry')} />
        <FabricCard img={assets.mcotton} label="COTTON"
          onClick={() => handleFabricClick('Cotton')} />
        <FabricCard img={assets.mlinen} label="LINEN"
          onClick={() => handleFabricClick('Linen')} />
      </div>

    </section>
  )
}

/* 🔹 OLD CARD (UNCHANGED) */
const CategoryCard = ({ img, label, onClick }) => (
  <div onClick={onClick} className="flex flex-col items-center cursor-pointer">
    <div className="w-20 h-20 rounded-full overflow-hidden">
      <img src={img} alt={label} className="w-full h-full object-cover" />
    </div>
    <p className="mt-3 text-xs">{label}</p>
  </div>
)

/* 🔹 NEW FABRIC CARD (UPDATED UI + HOVER) */
const FabricCard = ({ img, label, onClick }) => (
  <div
    onClick={onClick}
    className="group cursor-pointer flex flex-col items-center"
  >
    <div className="
      w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32
      rounded-full overflow-hidden
      border border-[#b64400]
      bg-[#f6c1cc]
      transition-all duration-300
      group-hover:-translate-y-2
    ">
      <img src={img} alt={label}
        className="w-full h-full object-cover" />
    </div>

    <p className="
      mt-3 text-[10px] sm:text-sm tracking-widest font-medium
      relative after:block after:h-[1px] after:w-0
      after:bg-[#b64400] after:transition-all after:duration-300
      group-hover:after:w-full
    ">
      {label}
    </p>
  </div>
)

export default Categories
