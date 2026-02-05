import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"
import fs from "fs"

// function for add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      colour,
      bestseller
    } = req.body

    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]

    const images = [image1, image2, image3, image4].filter(Boolean)

    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        })

        // 🔥 CRITICAL FIX FOR VERCEL
        fs.unlinkSync(item.path)

        return result.secure_url
      })
    )

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory: subCategory || "",
      sizes: sizes ? JSON.parse(sizes) : [],
      colour: colour || "",
      bestseller: bestseller === "true",
      image: imagesUrl,
      date: Date.now(),
    }

    const product = new productModel(productData)
    await product.save()

    res.json({ success: true, message: "Product Added" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// list products
const listProducts = async (req, res) => {
  try {
    const { category, subCategory } = req.query
    let filter = {}

    if (category) filter.category = category
    if (subCategory) filter.subCategory = subCategory

    const products = await productModel.find(filter)
    res.json({ success: true, products })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// remove product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id)
    res.json({ success: true, message: "Product Removed" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// single product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body
    const product = await productModel.findById(productId)
    res.json({ success: true, product })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

export { listProducts, addProduct, removeProduct, singleProduct }

