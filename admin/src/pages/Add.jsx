import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")

  // ✅ category migration
  const [category, setCategory] = useState("kurti")
  const [subCategory, setSubCategory] = useState("")

  const [sizes, setSizes] = useState([])
  const [colour, setColour] = useState("") // ✅ optional
  const [bestseller, setBestseller] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory || "")
      formData.append("sizes", JSON.stringify(sizes)) // optional
      formData.append("colour", colour || "")         // optional
      formData.append("bestseller", bestseller)

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      )

      if (response.data.success) {
        toast.success(response.data.message)

        setName("")
        setDescription("")
        setPrice("")
        setCategory("kurti")
        setSubCategory("")
        setSizes([])
        setColour("")
        setBestseller(false)

        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>

      {/* Upload Images */}
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          {[image1, image2, image3, image4].map((img, i) => (
            <label key={i} htmlFor={`image${i + 1}`}>
              <img
                className='w-20'
                src={!img ? assets.upload_area : URL.createObjectURL(img)}
                alt=""
              />
              <input
                hidden
                type="file"
                id={`image${i + 1}`}
                onChange={(e) => {
                  const file = e.target.files[0]
                  if (i === 0) setImage1(file)
                  if (i === 1) setImage2(file)
                  if (i === 2) setImage3(file)
                  if (i === 3) setImage4(file)
                }}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Name */}
      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full max-w-[500px] px-3 py-2'
          type="text"
          placeholder='Type here'
        />
      </div>

      {/* Description */}
      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='w-full max-w-[500px] px-3 py-2'
          placeholder='Write content here'
        />
      </div>

      {/* Category / SubCategory / Price */}
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

        <div>
          <p className='mb-2'>Product category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='w-full px-3 py-2'
          >
            <option value="kurti">Kurti</option>
            <option value="lehenga">Lehenga</option>
            <option value="gown">Gown</option>
            <option value="saree">Saree</option>
            <option value="suit">Suit</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Sub category</p>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className='w-full px-3 py-2'
          >
            <option value="">None</option>
            <option value="cotton">Cotton</option>
            <option value="rayon">Rayon</option>
            <option value="anarkali">Anarkali</option>
            <option value="straight">Straight</option>
            <option value="festive">Festive</option>
            <option value="party">Party Wear</option>
            <option value="bridal">Bridal</option>
            <option value="silk">Silk</option>
            <option value="chiffon">Chiffon</option>
            <option value="georgette">Georgette</option>
            <option value="salwar">Salwar</option>
            <option value="Organza">Organza</option>
            <option value="sharara">Sharara</option>
            <option value="palazzo">Palazzo</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='w-full px-3 py-2 sm:w-[120px]'
            type="number"
            placeholder='₹'
          />
        </div>
      </div>

      {/* Colour */}
      <div>
        <p className='mb-2'>Product Colour (optional)</p>
        <input
          value={colour}
          onChange={(e) => setColour(e.target.value)}
          className='w-full px-3 py-2'
          type="text"
          placeholder='Red, Blue, Maroon'
        />
      </div>

      {/* Sizes */}
      <div>
        <p className='mb-2'>Product Sizes (optional)</p>
        <div className='flex gap-3'>
          {["S", "M", "L", "XL", "XXL"].map(size => (
            <p
              key={size}
              onClick={() =>
                setSizes(prev =>
                  prev.includes(size)
                    ? prev.filter(i => i !== size)
                    : [...prev, size]
                )
              }
              className={`${sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}
            >
              {size}
            </p>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <div className='flex gap-2 mt-2'>
        <input
          type="checkbox"
          checked={bestseller}
          onChange={() => setBestseller(prev => !prev)}
          id='bestseller'
        />
        <label htmlFor="bestseller" className='cursor-pointer'>
          Add to bestseller
        </label>
      </div>

      <button type="submit" className='w-28 py-3 mt-4 bg-black text-white'>
        ADD
      </button>

    </form>
  )
}

export default Add
