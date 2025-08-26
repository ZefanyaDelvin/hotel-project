const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController.js');

router.get('/', reservationController.getReservations);
router.post('/create', reservationController.createReservation);
router.put("/:id/cancel", reservationController.cancelReservation);


module.exports = router;
