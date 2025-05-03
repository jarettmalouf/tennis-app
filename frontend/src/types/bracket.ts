export type SetScore = {
  gamesWon: number;
  tiebreakPointsWon?: number;
};

export type Player = {
  name: string;
  country: string;
  score: SetScore[];
  retired?: boolean;
};

export type Match = {
  id: string;
  player1: Player;
  player2: Player;
  selectedPlayer: Player | null;
};

export type Round = {
  name: string;
  matches: Match[];
};

export type BracketData = {
  tournamentName: string;
  tournamentLocation: string;
  tournamentDate: string;
  rounds: Round[];
  isLocked?: boolean;
};
