// User Types
export interface User {
  _id: string;
  username: string;
  name?: string;
  friends: string[];
  token?: string;
  bio?: string;
  profileImage?: string;
  language?: string;
}

// Tournament Types
export interface Tournament {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  surface: string;
  drawSize: number;
  prizeMoney: string;
  status: "upcoming" | "in-progress" | "completed";
}

// Prediction Types
export interface Prediction {
  _id: string;
  userId: string;
  tournamentId: string;
  matchId: string;
  predictedWinner: string;
  confidence: number;
  createdAt: string;
  updatedAt: string;
}

// Theme Types
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  notification: string;
}

export interface Theme {
  dark: boolean;
  colors: ThemeColors;
}
