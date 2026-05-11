import React from "react"
import { assets } from "../assets/assets"
import Title from "./Title"
import { useNavigate } from "react-router-dom"

const Categories = () => {

  const navigate = useNavigate()

  const fabrics = [
    { img: assets.msilk, label: "SILK", value: "Silk" },
    { img: assets.mgeor, label: "GEORGETTE", value: "Georgette" },
    { img: assets.morgan, label: "ORGANZA", value: "Organza" },
    { img: assets.mbur, label: "BURBERRY", value: "Burberry" },
    { img: assets.mcotton, label: "COTTON", value: "Cotton" },
    { img: assets.mlinen, label: "LINEN", value: "Linen" },
  ]

  const handleClick = (subCategory) => {
    navigate(`/collection?subCategory=${subCategory}`)
  }

  return (
    <section className="w-full py-16">

      <div className="text-center">
        <Title text1="SHOP BY" text2="FABRIC" />
      </div>

      <div className="
        mt-12 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6
        gap-y-10 gap-x-4 place-items-center px-4
      ">
        {fabrics.map(item => (
          <div
            key={item.label}
            onClick={() => handleClick(item.value)}
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
              <img
                src={item.img}
                alt={item.label}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="
              mt-3 text-[10px] sm:text-sm tracking-widest font-medium
              relative after:block after:h-[1px] after:w-0
              after:bg-[#b64400] after:transition-all after:duration-300
              group-hover:after:w-full
            ">
              {item.label}
            </p>
          </div>
        ))}
      </div>

    </section>
  )
}

export default Categories
