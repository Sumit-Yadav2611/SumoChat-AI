const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]); 
const path = require("path");


require("dotenv").config({
  path: path.join(__dirname, ".env"),
});
console.log("__dirname =", __dirname);
console.log("cwd =", process.cwd());
console.log("API =", process.env.GEMINI_API_KEY);
console.log("JWT Secret =", process.env.JWT_SECRET);
console.log("Mongo URI =", process.env.MONGO_URI);

const app = require("./app");

const connectDB = require("./config/db");
// Connect to Database
connectDB();


const PORT = process.env.PORT || 5000;

console.log(process.env.GEMINI_API_KEY);


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});