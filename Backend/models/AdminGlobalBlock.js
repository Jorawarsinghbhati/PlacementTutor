import mongoose from "mongoose";

const adminGlobalBlockSchema = new mongoose.Schema(
  {
    
    date: {
      type: String, 
      required: true,
      index: true,
    },
    startTime: {
      type: String, 
      required: true,
    },

   
    endTime: {
      type: String, 
      required: true,
    },


    reason: {
      type: String,
      default: "Platform unavailable",
      trim: true,
    },


    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    
    expiresAt: {
      type: Date,
      default: null,
      index: true,
    },


    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // ADMIN
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


adminGlobalBlockSchema.index(
  { date: 1, startTime: 1, endTime: 1 },
  { unique: true }
);

adminGlobalBlockSchema.index({ date: 1, isActive: 1 });

export default mongoose.model(
  "AdminGlobalBlock",
  adminGlobalBlockSchema
);
