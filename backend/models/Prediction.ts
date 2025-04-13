import mongoose, { Document, Schema } from 'mongoose';

export interface IPrediction extends Document {
  user: mongoose.Types.ObjectId;
  tournamentId: string;
  picks: string[];
  createdAt: Date;
}

const predictionSchema = new Schema<IPrediction>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tournamentId: { type: String, required: true },
  picks: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IPrediction>('Prediction', predictionSchema);
