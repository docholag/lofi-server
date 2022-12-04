const express = require("express");
const router = express.Router();
const Chill = require("../models/Chill");

//GET BACK ALL THE POSTS
router.get("/", async (req, res) => {
  const options = {
    // sort returned documents in ascending order
    sort: { createdAt: 1 },
    // Include only the following
    // projection : {}
  };

  const cursor = await Chill.find(options);
  if (cursor) {
    res.status(200).send({ success: true, data: cursor });
  } else {
    res.status(200).send({ success: true, msg: "No Data Found" });
  }
});

//SUBMITS A POST
router.post("/", async (req, res) => {
  const chill = new Chill({
    id: req.body.id,
    name: req.body.name,
    mood: req.body.mood,
    src: req.body.src,
  });
  try {
    const savedChill = await chill.save();
    res.json(savedChill);
  } catch (err) {
    res.json({ message: err });
  }
});

//SPECIFIC POST
router.get("/:postId", async (req, res) => {
  try {
    const chill = await Chill.findById(req.params.postId);
    res.json(chill);
  } catch (err) {
    res.json({ message: err });
  }
});

//DELETE POST
router.delete("/:postId", async (req, res) => {
  try {
    const removedChill = await Chill.remove({ _id: req.params.postId });
    res.json(removedChill);
  } catch (err) {
    res.json({ message: err });
  }
});

//UPDATE POST
router.patch("/:postId", async (req, res) => {
  try {
    const updatedChill = await Chill.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedChill);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
