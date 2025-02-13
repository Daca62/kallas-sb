const router = require("express").Router();
const About = require("../models/About.js");

//Create
router.post("/", async (req, res) => {
  const newAbout = new About(req.body);

  try {
    const savedAbout = await newAbout.save();
    res.status(200).json(savedAbout);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//Get
router.get("/find/:id", async (req, res) => {
  try {
    const about = await About.findById(req.params.id);
    res.status(200).json(about);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
