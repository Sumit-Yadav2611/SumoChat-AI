const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]); 
const path = require("path");


require("dotenv").config({
  path: path.join(__dirname, ".env"),
});
console.log("Environment loaded successfully");

const app = require("./app");

const connectDB = require("./config/db");
// Connect to Database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});