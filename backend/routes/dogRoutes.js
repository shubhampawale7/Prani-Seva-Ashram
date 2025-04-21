import express from "express";
import multer from "multer";
import path from "path";
import Dog from "../models/Dog.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save in /uploads folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

// @route POST /api/dogs
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, age, breed, gender, description } = req.body;

    const newDog = new Dog({
      name,
      age,
      breed,
      gender,
      description,
      image: req.file?.filename || "", // Save image filename
    });

    const savedDog = await newDog.save();
    res.status(201).json(savedDog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding dog" });
  }
});

// @route GET /api/dogs
// Assuming you're using Mongoose

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const dogsPerPage = 6;
  const skip = (page - 1) * dogsPerPage;

  try {
    const totalDogs = await Dog.countDocuments();
    const dogs = await Dog.find().skip(skip).limit(dogsPerPage);

    const totalPages = Math.ceil(totalDogs / dogsPerPage);

    res.json({ dogs, totalPages });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

export default router;
