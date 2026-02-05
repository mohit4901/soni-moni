import multer from "multer";

const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, file.originalname)
    }
})

const upload = multer({ storage })

// ✅ ONLY THIS WRAPPER ADDED
const uploadMiddleware = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200)
    }
    upload(req, res, next)
}

export default uploadMiddleware
