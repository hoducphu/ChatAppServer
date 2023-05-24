"use strict";

require("dotenv").config();
require("express-async-errors");
var express = require("express");
var app = express();
var http = require("http");
var server = http.createServer(app);
var io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*"
    // credentials: true,
  }
});

var cors = require("cors");
var BodyParser = require("body-parser");
var helmet = require("helmet");
var compression = require("compression");
var userRoute = require("./routes/user.route");
var roomRoute = require("./routes/room.route");
var chatRouter = require("./routes/chat.route");
var connectDB = require("./config/db.config");
var _require = require("./utils/errorHandle"),
  errorHandle = _require.errorHandle;
var port = process.env.PORT || 5000;
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({
  policy: "cross-origin"
}));
app.use(compression());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({
  extended: "true"
}));
app.use("/api/user", userRoute);
app.use("/api/room", roomRoute);
app.use("/api/chat", chatRouter);
app.use(errorHandle);
io.on("connection", function (socket) {
  socket.on("Join Room", function (room) {
    socket.join(room);
    console.log("User joined room: ".concat(room));
  });
  socket.on("Received Message", function (msg) {
    var room = msg.room;
    if (!room) return console.log("room not defined");
    socket.to(room._id).emit("New Message", msg);
  });
});
app.use("/uploads", express["static"]("uploads"));
connectDB.ConnectToMongoDB();
server.listen(port, console.log("port: ".concat(port)));
module.exports = server;