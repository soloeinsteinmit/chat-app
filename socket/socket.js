const { Server } = require("socket.io");

const io = new Server({
  cors: "http://localhost:5173",
});

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("🛫🛫🛫Connection established, socket.io-> ", socket.id);

  //listen to a connection
  socket.on("addNewUser", (userId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });

    console.log("Online users-> ", onlineUsers);
    // Emit online users to all connected clients
    io.emit("getOnlineUsers", onlineUsers);
  });

  //listen to a message
  socket.on("sendMessage", (message) => {
    const user = onlineUsers.find((user) => user.userId === message.receiverId);

    // Emitting a message to a specific user
    if (user) {
      io.to(user.socketId).emit("getMessage", message);
      io.to(user.socketId).emit("getNotification", {
        message: message.message,
        senderId: message.senderId,
        receiverId: message.receiverId,
        isRead: false,
        date: new Date(),
      });
    }
    // console.log("message-> ", message);
  });

  //listen to a disconnection
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    console.log("Online users-> ", onlineUsers);
    io.emit("getOnlineUsers", onlineUsers);
  });
});

io.listen(1234);
