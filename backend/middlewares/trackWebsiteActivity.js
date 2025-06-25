import PageVisit from "../models/PageVisit.js"; // Adjust path if needed

const trackWebsiteActivity = async (req, res, next) => {
  // Only track GET requests for public-facing HTML pages
  // Exclude API routes and static files to avoid polluting data
  if (
    req.method === "GET" &&
    !req.originalUrl.startsWith("/api") &&
    !req.originalUrl.startsWith("/uploads") &&
    !req.originalUrl.startsWith("/gallery")
  ) {
    try {
      const ipAddress = req.ip || req.connection.remoteAddress;
      const path = req.originalUrl;
      const userAgent = req.headers["user-agent"];
      let sessionID = req.cookies.sessionID; // Assuming you set a sessionID cookie

      // If no session ID cookie, generate one and set it
      if (!sessionID) {
        sessionID =
          req.sessionID ||
          Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
        res.cookie("sessionID", sessionID, {
          maxAge: 24 * 60 * 60 * 1000, // 24 hours
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Use secure in production
          sameSite: "Lax",
        });
      }

      // You can also get user ID if the user is logged in (e.g., from req.user if you have auth middleware)
      const userId = req.user ? req.user._id : null; // Example: if using Passport.js or similar

      await PageVisit.create({
        ipAddress,
        path,
        userAgent,
        sessionID,
        user: userId,
      });
      // console.log(`Logged visit: ${path} from ${ipAddress}`);
    } catch (error) {
      console.error("Error logging page visit:", error);
      // Don't block the request if logging fails
    }
  }
  next();
};

export default trackWebsiteActivity;
