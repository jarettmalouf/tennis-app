import { Tournament } from "./models";

// Root Stack Types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

// Auth Stack Types
export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

// Main Tab Types
export type MainTabParamList = {
  Tournaments: undefined;
  Picks: undefined;
  Standings: undefined;
  Profile: undefined;
};

// Profile Stack Types
export type ProfileStackParamList = {
  ProfileMain: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
  HelpSupport: undefined;
  About: undefined;
  Legal: undefined;
};

// Tournament Stack Types
export type TournamentStackParamList = {
  Tournaments: undefined;
  Picks: { tournament: Tournament | null };
  Standings: { tournament: Tournament | null };
};
