import { model, models, Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    addBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    memberId: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: true,
      index: true,
    },
    sportId: {
      type: Schema.Types.ObjectId,
      ref: "Sports",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

subscriptionSchema.index({ memberId: 1, sportId: 1 }, { unique: true });

const Subscriptions =
  models.Subscriptions || model("Subscriptions", subscriptionSchema);

export default Subscriptions;
