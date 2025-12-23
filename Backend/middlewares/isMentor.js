// middlewares/isMentor.js
export const isMentor = (req, res, next) => {
    try {
      // auth middleware must run before this
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }
  
      // only APPROVED mentors are allowed
      if (req.user.role !== "MENTOR") {
        return res.status(403).json({
          success: false,
          message: "Mentor access only",
        });
      }
  
      next();
    } catch (err) {
      console.error("isMentor middleware error:", err);
      res.status(500).json({
        success: false,
        message: "Mentor authorization failed",
      });
    }
  };
  