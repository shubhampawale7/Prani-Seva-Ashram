import Dog from "../models/Dog.js";

export const getAllDogs = async (req, res) => {
  try {
    const dogs = await Dog.find().sort({ addedAt: -1 });
    res.status(200).json(dogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch dogs" });
  }
};

export const addDog = async (req, res) => {
  try {
    const newDog = await Dog.create({
      name: req.body.name,
      age: req.body.age,
      breed: req.body.breed,
      gender: req.body.gender,
      description: req.body.description,
      image: req.body.image, // Image URL will be handled in a different way (e.g., file upload service)
      vaccinated: req.body.vaccinated, // Handle vaccinated status
    });
    res.status(201).json(newDog);
  } catch (err) {
    res.status(500).json({ error: "Failed to add dog" });
  }
};
// In your Express backend, modify the route to handle pagination

