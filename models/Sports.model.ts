import { model, models, Schema } from "mongoose";

const sportsSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Sports = models.Sports || model("Sports", sportsSchema);
export default Sports;
