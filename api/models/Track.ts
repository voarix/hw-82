import mongoose from "mongoose";
import Album from "./Album";

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: "Album",
    required: true,
    validate: {
      validator: async (value: string) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return false;
        }

        const album = await Album.findById(value);
        return !!album;
      },
      message: "Album not found",
    },
  },
  duration: {
    type: String,
    required: [true, "Duration is required"],
  },
  number: {
    type: Number,
    required: [true, "Album number is required"],
    min: 1,
  },
  youtube: String,
  isPublished: {
    type: Boolean,
    default: false,
  },
});


const Track = mongoose.model("Track", TrackSchema);
export default Track;