const app = require("./app");
const connectDB = require("./config/db");
const env = require("./config/env");

async function startServer() {
  await connectDB();

  app.listen(env.PORT, () => {
    console.log("======================================");
    console.log(`🚀 CodeSprint backend running on port ${env.PORT}`);
    console.log(`📍 Health: http://localhost:${env.PORT}/api/health`);
    console.log(`📍 API v1: http://localhost:${env.PORT}/api/v1`);
    console.log("======================================");
  });
}

startServer();