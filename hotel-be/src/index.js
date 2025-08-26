const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");
const path = require("path");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors());

app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");
const reservationRoutes = require("./routes/reservationRoutes");

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/reservation", reservationRoutes);
