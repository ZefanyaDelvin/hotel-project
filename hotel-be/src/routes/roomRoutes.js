const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController.js");
const upload = require("../models/middleware/upload.js");

router.get("/", roomController.getAllRooms);
router.post(
  "/create",
  upload.fields([
    { name: "photo", maxCount: 5 },
    { name: "video", maxCount: 2 },
  ]),
  roomController.createRoom
);
router.put(
  "/update/:id",
  upload.fields([
    { name: "photo", maxCount: 5 },
    { name: "video", maxCount: 2 },
  ]),
  roomController.updateRoom
);
router.delete("/delete/:id", roomController.deleteRoom);

module.exports = router;
