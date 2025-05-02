import mongoose, { Document, Schema } from "mongoose";

interface Player {
  name: string;
  country: string;
}

export interface IPrediction extends Document {
  user: mongoose.Types.ObjectId;
  tournamentId: string;
  picks: Player[];
  createdAt: Date;
}

const predictionSchema = new Schema<IPrediction>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tournamentId: {
    type: String,
    required: true,
  },
  picks: [
    {
      name: { type: String, required: true },
      country: { type: String, required: true },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IPrediction>("Prediction", predictionSchema);
