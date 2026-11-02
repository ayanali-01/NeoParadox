import app from "./src/app.js";
import { connectdb } from "./src/config/db.js"

export default async function handler(req, res) {
  try {
    await connectdb()
  } catch (error) {
    console.error("MongoDB connection failed:", error.name)
    return res.status(503).json({
      message: "Database unavailable"
    })
  }

  return app(req, res)
}