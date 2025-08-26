const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await prisma.room.findMany();
    if (rooms.length === 0) {
      res.json({ message: "No rooms found" });
    } else {
      res.json(rooms);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createRoom = async (req, res) => {
  const { roomNumber, type, price, status } = req.body;
  try {
    const newRoom = await prisma.room.create({
      data: { roomNumber, type, price, status: status || "AVAILABLE" },
    });
    res
      .status(200)
      .json({ message: "Room created successfully", data: newRoom });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateRoom = async (req, res) => {
  const { id } = req.params;
  const { roomNumber, type, price, status } = req.body;

  try {
    const updatedRoom = await prisma.room.update({
      where: { roomId: Number(id) },
      data: { roomNumber, type, price, status },
    });
    res
      .status(200)
      .json({ message: "Room updated successfully", data: updatedRoom });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteRoom = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.room.delete({ where: { roomId: Number(id) } });
    res.json({ message: "Room deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
