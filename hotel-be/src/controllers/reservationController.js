const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

exports.getReservations = async (req, res) => {
  try {
    const reservations = await prisma.reservation.findMany({
      include: {
        user: true,
        room: true,
        payments: true,
      },
    });

    if (reservations.length === 0) {
      res.json({ message: "No reservations found" });
    } else {
      res.json(reservations);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createReservation = async (req, res) => {
  const { userId, roomId, checkInDate, checkOutDate } = req.body;

  try {
    const room = await prisma.room.findUnique({
      where: { roomId: Number(roomId) },
    });

    if (!room) return res.status(404).json({ message: "Room not found" });
    if (room.status !== "AVAILABLE")
      return res.status(400).json({ message: "Room not available" });

    const reservation = await prisma.reservation.create({
      data: {
        userId,
        roomId: Number(roomId),
        checkInDate: new Date(checkInDate),
        checkOutDate: new Date(checkOutDate),
        status: "PENDING_PAYMENT",
      },
    });

    // Reserve the room
    await prisma.room.update({
      where: { roomId: Number(roomId) },
      data: { status: "RESERVED" },
    });

    res.status(201).json({ message: "Reservation created", data: reservation });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.cancelReservation = async (req, res) => {
  const { id } = req.params; // reservationId

  try {
    // Find the reservation
    const reservation = await prisma.reservation.findUnique({
      where: { reservationId: id },
      include: { room: true },
    });

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    if (reservation.status === "CANCELLED") {
      return res.status(400).json({ message: "Reservation already cancelled" });
    }

    // Update reservation status
    const updatedReservation = await prisma.reservation.update({
      where: { reservationId: id },
      data: { status: "CANCELLED" },
    });

    // Make room available again
    await prisma.room.update({
      where: { roomId: reservation.roomId },
      data: { status: "AVAILABLE" },
    });

    res.json({
      message: "Reservation cancelled successfully",
      data: updatedReservation,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
