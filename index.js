require("dotenv").config(); // lib sử dụng biến môi trường
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

const cors = require("cors");
const BodyParser = require("body-parser");
const userRoute = require("./routes/user.route");
const roomRoute = require("./routes/room.route");
const chatRouter = require("./routes/chat.route");
const connectDB = require("./config/db.config");

// global variable
global._dirname = __dirname;
app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: "true" }));

const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.io = io;
  next();
});

app.use("/", res, (req) => {
  res.send("API is running");
});

app.use("/api/user", userRoute);
app.use("/api/room", roomRoute);
app.use("/api/chat", chatRouter);

io.on("connection", (socket) => {
  socket.on("Join Room", (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on("Received Message", (msg) => {
    var room = msg.room;
    if (!room) return console.log("room not defined");

    socket.to(room._id).emit("New Message", msg);
  });
});

app.use("/uploads", express.static("uploads"));

connectDB.ConnectToMongoDB();
server.listen(port, console.log(`port: ${port}`));
