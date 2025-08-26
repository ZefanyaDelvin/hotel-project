const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await prisma.room.findMany({
      select: {
        roomId: true,
        roomNumber: true,
        type: true,
        price: true,
        createdAt: true,
        updatedAt: true,
        status: {
          select: { statusName: true },
        },
        photoUrl: true,
        videoUrl: true,
      },
    });

    if (rooms.length === 0) {
      res.json({ message: "No rooms found" });
    } else {
      const formattedRooms = rooms.map((room) => ({
        ...room,
        status: room.status.statusName,
      }));

      res.json(formattedRooms);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createRoom = async (req, res) => {
  const { roomNumber, type, price, statusId } = req.body;

  try {
    const newRoom = await prisma.room.create({
      data: {
        roomNumber: Number(roomNumber),
        type,
        price: Number(price),
        statusId: 1,
        photoUrl: req.files?.photo
          ? `/uploads/${req.files.photo[0].filename}`
          : null,
        videoUrl: req.files?.video
          ? `/uploads/${req.files.video[0].filename}`
          : null,
      },
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
  const { roomNumber, type, price, statusId } = req.body;

  try {
    const updatedRoom = await prisma.room.update({
      where: { roomId: Number(id) },
      data: {
        roomNumber: roomNumber ? Number(roomNumber) : undefined,
        type: type || undefined,
        price: price ? Number(price) : undefined,
        statusId: statusId ? Number(statusId) : undefined,
        photoUrl: req.files?.photo
          ? `/uploads/${req.files.photo[0].filename}`
          : undefined,
        videoUrl: req.files?.video
          ? `/uploads/${req.files.video[0].filename}`
          : undefined,
      },
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
