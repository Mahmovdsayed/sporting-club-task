import { model, models, Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    imageUrl: { type: String, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = models.User || model("User", userSchema);
export default User;
