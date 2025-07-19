const http = require("http");
const app = require("./app");
const { connectDB } = require("./config/db");

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Socket setup (later)
// require('./sockets/notifications')(server);

connectDB().then(() => {
  server.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});
