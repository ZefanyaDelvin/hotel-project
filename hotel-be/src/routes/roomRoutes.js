const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController.js');

router.get('/', roomController.getAllRooms);
router.post('/create', roomController.createRoom);
router.put("/update/:id", roomController.updateRoom);
router.delete('/delete/:id', roomController.deleteRoom);

module.exports = router;
