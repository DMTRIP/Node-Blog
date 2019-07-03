const express = require("express");

const router = express.Router();

// get all post from db
router.get("/", (req, res) => {
  res.send("all post from db");
});

// get single post by id
router.get("/:id", (req, res) => {
  res.send("single post by id");
});

// create new post
router.post("/create", (req, res) => {
  res.send("create post");
});

// edit post
router.put("/edit", (req, res) => {
  res.send("edit post");
});

// delete post by id
router.delete("/del/:id", (req, res) => {
  res.send("delete post");
});

module.exports = router;
