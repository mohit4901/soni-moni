import multer from "multer";

// ✅ MEMORY STORAGE (Vercel compatible)
const storage = multer.memoryStorage();

const upload = multer({ storage });

// ✅ OPTIONS SAFE
const uploadMiddleware = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
  ])(req, res, next);
};

export default uploadMiddleware;
