import mongoose from "mongoose";
import User from "./User";
import Track from "./Track";

const Schema = mongoose.Schema;

const HistorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async (value: string) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return false;
        }

        const user = await User.findById(value);
        return !!user;
      },
      message: "User not found",
    }
  },
  track: {
    type: Schema.Types.ObjectId,
    ref: "Track",
    required: true,
    validate: {
      validator: async (value: string) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return false;
        }

        const track = await Track.findById(value);
        return !!track;
      },
      message: "Track not found",
    },
  },
  datetime: {
    type: Date,
    required: [true, "Datetime is required"],
    default: Date.now,
  },
});


const TrackHistory = mongoose.model("TrackHistory", HistorySchema);
export default TrackHistory;