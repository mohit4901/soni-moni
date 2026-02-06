import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// ADD PRODUCT
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
    } = req.body;

    // ✅ images array from multer.memoryStorage
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required"
      });
    }

    // 🔥 PARALLEL CLOUDINARY UPLOAD (FIX 5)
    const uploadPromises = files.map((file) =>
      cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
        { resource_type: "image" }
      )
    );

    const results = await Promise.all(uploadPromises);
    const imageUrls = results.map((r) => r.secure_url);

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory: subCategory || "",
      sizes: sizes ? JSON.parse(sizes) : [],
      colour: colour || "",
      bestseller: bestseller === "true" || bestseller === true,
      image: imageUrls,
      date: Date.now()
    };

    const product = new productModel(productData);
    await product.save();

    res.status(201).json({
      success: true,
      message: "Product Added"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Product upload failed"
    });
  }
};

// LIST PRODUCTS
const listProducts = async (req, res) => {
  try {
    const { category, subCategory } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (subCategory) filter.subCategory = subCategory;

    const products = await productModel.find(filter);
    res.json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// REMOVE PRODUCT
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// SINGLE PRODUCT
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { listProducts, addProduct, removeProduct, singleProduct };


