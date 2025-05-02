import mongoose, { Document, Schema } from "mongoose";

interface Player {
  name: string;
  country: string;
}

interface Match {
  id: string;
  player1: Player;
  player2: Player;
  selectedPlayer: Player | null;
}

interface Round {
  name: string;
  matches: Match[];
}

interface BracketData {
  tournamentName: string;
  tournamentLocation: string;
  tournamentDate: string;
  rounds: Round[];
  isLocked?: boolean;
}

export interface IPrediction extends Document {
  user: mongoose.Types.ObjectId;
  tournamentId: string;
  bracketData: BracketData;
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
  bracketData: {
    tournamentName: { type: String, required: true },
    tournamentLocation: { type: String, required: true },
    tournamentDate: { type: String, required: true },
    rounds: [
      {
        name: { type: String, required: true },
        matches: [
          {
            id: { type: String, required: true },
            player1: {
              name: { type: String, required: true },
              country: { type: String, required: true },
            },
            player2: {
              name: { type: String, required: true },
              country: { type: String, required: true },
            },
            selectedPlayer: {
              name: { type: String },
              country: { type: String },
            },
          },
        ],
      },
    ],
    isLocked: { type: Boolean, default: false },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IPrediction>("Prediction", predictionSchema);
