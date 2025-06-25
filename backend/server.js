import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import donationRoutes from "./routes/donationRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import rescueRoutes from "./routes/rescueRoutes.js"; // ✅ Imported rescue routes
import galleryRoutes from "./routes/galleryRoutes.js";
import inquiryRoutes from "./routes/inquiry.js";
import replyRoutes from "./routes/replyRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import dogRoutes from "./routes/dogRoutes.js";
import PageVisit from "./models/PageVisit.js"; // Path to your new PageVisit model
import trackWebsiteActivity from "./middlewares/trackWebsiteActivity.js";
import cron from "node-cron";

dotenv.config();
connectDB(); // connect to DB

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(trackWebsiteActivity);

app.use("/gallery", express.static("public/gallery"));
// Serve the 'uploads' folder as static files
app.use("/uploads", express.static("uploads"));

cron.schedule("0 2 * * *", async () => {
  console.log("Running daily cleanup of old page visit data...");
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 30); // Keep data for the last 30 days

    const result = await PageVisit.deleteMany({
      createdAt: { $lt: cutoffDate },
    });
    console.log(`Deleted ${result.deletedCount} old page visit records.`);
  } catch (error) {
    console.error("Error during old page visit data cleanup:", error);
  }
});

app.get("/api/health", (req, res) => {
  console.log("Health check requested");
  res
    .status(200)
    .json({ status: "operational", message: "Backend is up and running!" });
});
app.get("/api/metrics/website-traffic", async (req, res) => {
  console.log("Website traffic metrics requested (real-time)");
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today

    // Aggregation to count unique visitors and total page views for today
    const stats = await PageVisit.aggregate([
      {
        $match: {
          createdAt: { $gte: today },
          // Optional: Exclude certain paths like admin routes if they shouldn't count for public traffic
          // path: { $not: /^(\/admin)/ }
        },
      },
      {
        $facet: {
          uniqueVisitors: [
            {
              $group: {
                _id: "$ipAddress", // Group by IP for unique visitors
                // Or if you use sessions and want unique sessions: _id: '$sessionID'
                // Or if you track logged-in users: _id: '$user'
              },
            },
            {
              $count: "count",
            },
          ],
          pagesViewed: [
            {
              $count: "count",
            },
          ],
        },
      },
      {
        $project: {
          visitorsToday: { $arrayElemAt: ["$uniqueVisitors.count", 0] },
          pagesViewed: { $arrayElemAt: ["$pagesViewed.count", 0] },
        },
      },
    ]);

    // Handle case where no data yet for today
    const visitorsToday = stats[0]?.visitorsToday || 0;
    const pagesViewed = stats[0]?.pagesViewed || 0;

    res.status(200).json({ visitorsToday, pagesViewed });
  } catch (error) {
    console.error("Error fetching real-time website traffic:", error);
    res.status(500).json({
      message: "Failed to fetch real-time website traffic data.",
      error: error.message,
    });
  }
});

// Routes
app.use("/api/donate", donationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/rescues", rescueRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/gallery", galleryRoutes); // ✅ Mounted rescue route
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/reply", replyRoutes);
app.use("/api/dogs", dogRoutes);
app.use("/api/admin-inquiries", enquiryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
