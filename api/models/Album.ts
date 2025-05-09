import mongoose from "mongoose";
import Artist from "./Artist";

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
    validate: {
      validator: async (value: string) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return false;
        }

        const artist = await Artist.findById(value);
        return !!artist;
      },
      message: "Artist not found",
    },
  },
  date: {
    type: Number,
    required: [true, "Date is required"],
  },
  image: String,
  isPublished: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});


const Album = mongoose.model("Album", AlbumSchema);
export default Album;