const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

const USERS_FILE = path.join(__dirname, "database/users.json");
if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, "{}");

// Notification paiement
let paymentStatus = {};

app.post("/confirm-payment", (req, res) => {
  const { userId, status } = req.body; // yes / no
  paymentStatus[userId] = status;
  io.to(userId).emit("payment-response", status);
  res.json({ success: true });
});

// Ajouter nouvel utilisateur après signup
app.post("/signup", (req, res) => {
  const { username } = req.body;
  const users = JSON.parse(fs.readFileSync(USERS_FILE));
  if (users[username]) return res.json({ success: false, msg: "Utilisateur existe déjà" });
  users[username] = { username };
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  res.json({ success: true });
});

io.on("connection", (socket) => {
  console.log("Utilisateur connecté : " + socket.id);

  socket.on("join-room", (userId) => {
    socket.join(userId);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Server running on port", PORT));
