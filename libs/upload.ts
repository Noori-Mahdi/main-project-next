import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "public/uploads", // محل ذخیره تصاویر
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // نام یونیک برای فایل
  },
});

export const upload = multer({ storage });