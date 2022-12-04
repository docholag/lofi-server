const express = require("express");
const router = express.Router();
const Sleep = require("../models/Sleep");

//GET BACK ALL THE POSTS
router.get("/", async (req, res) => {
  const options = {
    // sort returned documents in ascending order
    sort: { createdAt: 1 },
    // Include only the following
    // projection : {}
  };

  const cursor = await Sleep.find(options);
  if (cursor) {
    res.status(200).send({ success: true, data: cursor });
  } else {
    res.status(200).send({ success: true, msg: "No Data Found" });
  }
});

//SUBMITS A POST
router.post("/", async (req, res) => {
  const post = new Sleep({
    id: req.body.id,
    name: req.body.name,
    mood: req.body.mood,
    src: req.body.src,
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//SPECIFIC POST
router.get("/:postId", async (req, res) => {
  try {
    const post = await Sleep.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

//DELETE POST
router.delete("/:postId", async (req, res) => {
  try {
    const removedPost = await Sleep.remove({ _id: req.params.postId });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//UPDATE POST
router.patch("/:postId", async (req, res) => {
  try {
    const updatedPost = await Sleep.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
