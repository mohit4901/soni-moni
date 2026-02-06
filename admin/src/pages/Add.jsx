import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";

const Add = ({ token }) => {
  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [quality, setQuality] = useState(0.8); // 🔥 compression quality slider

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("kurti");
  const [subCategory, setSubCategory] = useState("");
  const [sizes, setSizes] = useState([]);
  const [colour, setColour] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔥 image compression + validation
  const processImage = async (file) => {
    const options = {
      maxSizeMB: 1.2,
      maxWidthOrHeight: 1200,
      initialQuality: quality,
      useWebWorker: true
    };

    const compressed = await imageCompression(file, options);

    if (compressed.size > 3 * 1024 * 1024) {
      throw new Error("Image still larger than 3MB");
    }

    return compressed;
  };

  // 🔥 handle image select / drop
  const handleImageAdd = async (file, index) => {
    try {
      toast.info("Compressing image...");
      const compressed = await processImage(file);

      const updated = [...images];
      updated[index] = compressed;
      setImages(updated);
    } catch (err) {
      toast.error(err.message || "Image processing failed");
    }
  };

  // 🔥 drag & drop handlers
  const handleDrop = async (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).slice(0, 4);

    for (let i = 0; i < files.length; i++) {
      await handleImageAdd(files[i], i);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      toast.error("Please upload at least 1 image");
      return;
    }

    try {
      setLoading(true);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory || "");
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("colour", colour || "");
      formData.append("bestseller", bestseller);

      images.forEach((img) => {
        formData.append("images", img);
      });

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token
          },
          timeout: 30000,
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percent);
          }
        }
      );

      if (response.data.success) {
        toast.success("Product added successfully");
        setName("");
        setDescription("");
        setPrice("");
        setCategory("kurti");
        setSubCategory("");
        setSizes([]);
        setColour("");
        setBestseller(false);
        setImages([]);
        setUploadProgress(0);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full gap-4"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {/* 🔥 Drag & Drop + Preview */}
      <div>
        <p className="mb-2">Upload Images (Drag & Drop / Click)</p>
        <div className="flex gap-3">
          {[0, 1, 2, 3].map((i) => (
            <label key={i} className="cursor-pointer">
              <img
                src={
                  images[i]
                    ? URL.createObjectURL(images[i])
                    : assets.upload_area
                }
                className="w-24 h-24 object-cover border"
                alt=""
              />
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e) =>
                  e.target.files[0] &&
                  handleImageAdd(e.target.files[0], i)
                }
              />
            </label>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Max 4 images • Auto compressed • Drag files here
        </p>
      </div>

      {/* 🔥 Compression Quality Slider */}
      <div className="w-full max-w-xs">
        <p className="mb-1">Image Quality: {Math.round(quality * 100)}%</p>
        <input
          type="range"
          min="0.4"
          max="1"
          step="0.05"
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
        />
      </div>

      {/* 🔥 Upload Progress */}
      {loading && (
        <div className="w-full max-w-md">
          <div className="h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-green-500 rounded"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-sm mt-1">{uploadProgress}% uploaded</p>
        </div>
      )}

      {/* Product Fields */}
      <input
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product name"
        className="px-3 py-2 border"
      />

      <textarea
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="px-3 py-2 border"
      />

      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        className="px-3 py-2 border w-40"
      />

      <button
        disabled={loading}
        className="w-32 py-3 bg-black text-white disabled:opacity-60"
      >
        {loading ? "Uploading..." : "ADD"}
      </button>
    </form>
  );
};

export default Add;
