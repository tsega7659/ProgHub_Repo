require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up storage with Multer & Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    format: async () => "png",
    public_id: (req, file) => file.originalname.split(".")[0],
  },
});

const upload = multer({ storage });

// API route to upload images
app.post("/upload-image", upload.single("image"), (req, res) => {
  console.log(req.file); // Debugging: Check if file is received

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.json({ imageUrl: req.file.path });
});

// Serve index.html when visiting the site
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Serve static frontend files (keep it below API routes)
app.use(express.static("public"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
