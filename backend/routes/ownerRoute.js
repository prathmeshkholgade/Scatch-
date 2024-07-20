const express = require("express");
const router = express.Router();
const owner = require("../models/ownerModel");

console.log("status");
// console.log(process.env.NODE_ENV);

router.get("/", (req, res) => {
  res.send("owners  routing");
});
if (process.env.NODE_ENV === "production") {
  router.post("/create", async (req, res) => {
    const ownerColl = await owner.find({});
    if (ownerColl.length > 0) {
      return res.status(503).send("you don't have permission to create owner");
    }
    const ownerInfo = await new owner(req.body);
    const resOwner = await ownerInfo.save();
    res.send(resOwner);
  });
}

module.exports = router;
