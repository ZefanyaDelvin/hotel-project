const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

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
