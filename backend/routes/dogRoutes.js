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
      image: req.file?.filename || "",
    });

    const savedDog = await newDog.save();
    res.status(201).json(savedDog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding dog" });
  }
});

// @route GET /api/dogs
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

// @route PUT /api/dogs/:id
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, age, breed, gender, description } = req.body;

    const updatedFields = {
      name,
      age,
      breed,
      gender,
      description,
      adopted: req.body.adopted === "true" || req.body.adopted === true,
    };

    if (req.file) {
      updatedFields.image = req.file.filename;
    }

    const updatedDog = await Dog.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    res.json(updatedDog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
});

// @route DELETE /api/dogs/:id
router.delete("/:id", async (req, res) => {
  try {
    await Dog.findByIdAndDelete(req.params.id);
    res.json({ message: "Dog deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;
