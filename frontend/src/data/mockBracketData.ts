import { BracketData } from "../types/bracket";

// Define types for the bracket data
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

export const mockBracketData: BracketData = {
  tournamentName: "Monte-Carlo Masters",
  tournamentLocation: "Monte Carlo, Monaco",
  tournamentDate: "April 7-14, 2025",
  rounds: [
    {
      name: "Round of 64",
      matches: [
        {
          id: "1",
          player1: {
            name: "N. Djokovic (1)",
            country: "RS",
            score: [
              { gamesWon: 6 },
              { gamesWon: 6, tiebreakPointsWon: 1 },
              { gamesWon: 7, tiebreakPointsWon: 10 },
            ],
          },
          player2: {
            name: "R. Safiullin",
            country: "RU",
            score: [
              { gamesWon: 2 },
              { gamesWon: 7, tiebreakPointsWon: 7 },
              { gamesWon: 6, tiebreakPointsWon: 8 },
            ],
          },
          selectedPlayer: null,
        },
        {
          id: "2",
          player1: { name: "A. Popyrin", country: "AU", score: [] },
          player2: { name: "R. Gasquet (WC)", country: "FR", score: [] },
          selectedPlayer: null,
        },
        {
          id: "3",
          player1: { name: "L. Musetti (13)", country: "IT", score: [] },
          player2: { name: "F. Fognini (WC)", country: "IT", score: [] },
          selectedPlayer: null,
        },
        {
          id: "4",
          player1: { name: "A. Muller", country: "FR", score: [] },
          player2: { name: "C. Alcaraz (2)", country: "ES", score: [] },
          selectedPlayer: null,
        },
        {
          id: "5",
          player1: { name: "D. Medvedev (3)", country: "RU", score: [] },
          player2: { name: "G. Monfils (WC)", country: "FR", score: [] },
          selectedPlayer: null,
        },
        {
          id: "6",
          player1: { name: "G. Dimitrov (15)", country: "BG", score: [] },
          player2: { name: "M. Kecmanovic", country: "RS", score: [] },
          selectedPlayer: null,
        },
        {
          id: "7",
          player1: { name: "A. de Minaur (8)", country: "AU", score: [] },
          player2: { name: "S. Wawrinka (WC)", country: "CH", score: [] },
          selectedPlayer: null,
        },
        {
          id: "8",
          player1: { name: "J. Sinner (4)", country: "IT", score: [] },
          player2: { name: "S. Korda", country: "US", score: [] },
          selectedPlayer: null,
        },
        {
          id: "9",
          player1: { name: "A. Rublev (5)", country: "RU", score: [] },
          player2: { name: "T. Etcheverry", country: "AR", score: [] },
          selectedPlayer: null,
        },
        {
          id: "10",
          player1: { name: "U. Humbert (14)", country: "FR", score: [] },
          player2: { name: "B. Shelton", country: "US", score: [] },
          selectedPlayer: null,
        },
        {
          id: "11",
          player1: { name: "C. Ruud (7)", country: "NO", score: [] },
          player2: { name: "N. Jarry", country: "CL", score: [] },
          selectedPlayer: null,
        },
        {
          id: "12",
          player1: { name: "H. Hurkacz (6)", country: "PL", score: [] },
          player2: { name: "J. Lehecka", country: "CZ", score: [] },
          selectedPlayer: null,
        },
        {
          id: "13",
          player1: { name: "S. Tsitsipas (9)", country: "GR", score: [] },
          player2: { name: "L. Sonego", country: "IT", score: [] },
          selectedPlayer: null,
        },
        {
          id: "14",
          player1: { name: "F. Tiafoe (12)", country: "US", score: [] },
          player2: { name: "M. Berrettini", country: "IT", score: [] },
          selectedPlayer: null,
        },
        {
          id: "15",
          player1: { name: "A. Zverev (10)", country: "DE", score: [] },
          player2: { name: "S. Baez", country: "AR", score: [] },
          selectedPlayer: null,
        },
        {
          id: "16",
          player1: { name: "J. Draper (11)", country: "GB", score: [] },
          player2: { name: "D. Shapovalov", country: "CA", score: [] },
          selectedPlayer: null,
        },
        {
          id: "17",
          player1: { name: "K. Khachanov (16)", country: "RU", score: [] },
          player2: { name: "C. Norrie", country: "GB", score: [] },
          selectedPlayer: null,
        },
        {
          id: "18",
          player1: { name: "B. Coric", country: "HR", score: [] },
          player2: { name: "A. Davidovich Fokina", country: "ES", score: [] },
          selectedPlayer: null,
        },
        {
          id: "19",
          player1: { name: "T. Fritz", country: "US", score: [] },
          player2: { name: "D. Lajovic", country: "RS", score: [] },
          selectedPlayer: null,
        },
        {
          id: "20",
          player1: { name: "A. Bublik", country: "KZ", score: [] },
          player2: { name: "J. Struff", country: "DE", score: [] },
          selectedPlayer: null,
        },
        {
          id: "21",
          player1: { name: "F. Cerundolo", country: "AR", score: [] },
          player2: { name: "M. Fucsovics", country: "HU", score: [] },
          selectedPlayer: null,
        },
        {
          id: "22",
          player1: { name: "R. Bautista Agut", country: "ES", score: [] },
          player2: { name: "A. Mannarino", country: "FR", score: [] },
          selectedPlayer: null,
        },
        {
          id: "23",
          player1: { name: "M. Arnaldi", country: "IT", score: [] },
          player2: { name: "Y. Hanfmann", country: "DE", score: [] },
          selectedPlayer: null,
        },
        {
          id: "24",
          player1: { name: "J. Thompson", country: "AU", score: [] },
          player2: { name: "N. Borges", country: "PT", score: [] },
          selectedPlayer: null,
        },
        {
          id: "25",
          player1: { name: "P. Martinez", country: "ES", score: [] },
          player2: { name: "M. Giron", country: "US", score: [] },
          selectedPlayer: null,
        },
        {
          id: "26",
          player1: { name: "T. Machac", country: "CZ", score: [] },
          player2: { name: "C. Moutet", country: "FR", score: [] },
          selectedPlayer: null,
        },
        {
          id: "27",
          player1: { name: "V. Pospisil", country: "CA", score: [] },
          player2: { name: "R. Carballes Baena", country: "ES", score: [] },
          selectedPlayer: null,
        },
        {
          id: "28",
          player1: { name: "D. Altmaier", country: "DE", score: [] },
          player2: { name: "M. Cressy", country: "US", score: [] },
          selectedPlayer: null,
        },
        {
          id: "29",
          player1: { name: "F. Cobolli", country: "IT", score: [] },
          player2: { name: "B. Nakashima", country: "US", score: [] },
          selectedPlayer: null,
        },
        {
          id: "30",
          player1: { name: "A. Fils", country: "FR", score: [] },
          player2: { name: "D. Koepfer", country: "DE", score: [] },
          selectedPlayer: null,
        },
        {
          id: "31",
          player1: { name: "F. Auger-Aliassime", country: "CA", score: [] },
          player2: { name: "L. Van Assche", country: "FR", score: [] },
          selectedPlayer: null,
        },
        {
          id: "32",
          player1: { name: "J. Munar", country: "ES", score: [] },
          player2: { name: "R. Berankis", country: "LT", score: [] },
          selectedPlayer: null,
        },
      ],
    },
    {
      name: "Round of 32",
      matches: [
        {
          id: "33",
          player1: { name: "TBD", country: "", score: [] },
          player2: { name: "TBD", country: "", score: [] },
          selectedPlayer: null,
        },
        {
          id: "34",
          player1: { name: "TBD", country: "", score: [] },
          player2: { name: "TBD", country: "", score: [] },
          selectedPlayer: null,
        },
        {
          id: "35",
          player1: { name: "TBD", country: "", score: [] },
          player2: { name: "TBD", country: "", score: [] },
          selectedPlayer: null,
        },
        {
          id: "36",
          player1: { name: "TBD", country: "", score: [] },
          player2: { name: "TBD", country: "", score: [] },
          selectedPlayer: null,
        },
        {
          id: "37",
          player1: { name: "TBD", country: "", score: [] },
          player2: { name: "TBD", country: "", score: [] },
          selectedPlayer: null,
        },
        {
          id: "38",
          player1: { name: "TBD", country: "", score: [] },
          player2: { name: "TBD", country: "", score: [] },
          selectedPlayer: null,
        },
        {
          id: "39",
          player1: { name: "TBD", country: "", score: [] },
          player2: { name: "TBD", country: "", score: [] },
          selectedPlayer: null,
        },
        {
          id: "40",
          player1: { name: "TBD", country: "", score: [] },
          player2: { name: "TBD", country: "", score: [] },
          selectedPlayer: null,
        },
        {
          id: "41",
          player1: { name: "TBD", country: "", score: [] },
          player2: { name: "TBD", country: "", score: [] },
          selectedPlayer: null,
        },
        {
          id: "42",
          player1: { name: "TBD", country: "", score: [] },
          player2: { name: "TBD", country: "", score: [] },
          selectedPlayer: null,
        },
        {
          id: "43",
          player1: { name: "TBD", country: "", score: [] },
          player2: { name: "TBD", country: "", score: [] },
          selectedPlayer: null,
        },
        {
          id: "44",
          player1: { name: "TBD", country: "", score: [] },
          player2: { name: "TBD", country: "", score: [] },
          selectedPlayer: null,
        },
        {
          id: "45",
          player1: { name: "TBD", country: "", score: [] },
          player2: { name: "TBD", country: "", score: [] },
          selectedPlayer: null,
        },
        {
          id: "46",
          player1: { name: "TBD", country: "", score: [] },
          player2: { name: "TBD", country: "", score: [] },
          selectedPlayer: null,
        },
        {
          id: "47",
          player1: { name: "TBD", country: "", score: [] },
          player2: { name: "TBD", country: "", score: [] },
          selectedPlayer: null,
        },
        {
          id: "48",
          player1: { name: "TBD", country: "", score: [] },
          player2: { name: "TBD", country: "", score: [] },
          selectedPlayer: null,
        },
      ],
    },
    {
      name: "Round of 16",
      matches: [
        {
          id: "49",
          player1: { name: "TBD", country: "", score: [] },
          player2: { name: "TBD", country: "", score: [] },
          selectedPlayer: null,
        },
        {
          id: "50",
          player1: { name: "TBD", country: "", score: [] },
          player2: { name: "TBD", country: "", score: [] },
          selectedPlayer: null,
        },
        {
          id: "51",
          player1: { name: "TBD", country: "", score: [] },
          player2: { name: "TBD", country: "", score: [] },
          selectedPlayer: null,
        },
        {
          id: "52",
          player1: { name: "TBD", country: "", score: [] },
          player2: { name: "TBD", country: "", score: [] },
          selectedPlayer: null,
        },
        {
          id: "53",
          player1: { name: "TBD", country: "", score: [] },
          player2: { name: "TBD", country: "", score: [] },
          selectedPlayer: null,
        },
        {
          id: "54",
          player1: { name: "TBD", country: "", score: [] },
          player2: { name: "TBD", country: "", score: [] },
          selectedPlayer: null,
        },
        {
          id: "55",
          player1: { name: "TBD", country: "", score: [] },
          player2: { name: "TBD", country: "", score: [] },
          selectedPlayer: null,
        },
        {
          id: "56",
          player1: { name: "TBD", country: "", score: [] },
          player2: { name: "TBD", country: "", score: [] },
          selectedPlayer: null,
        },
      ],
    },
    {
      name: "Quarterfinals",
      matches: [
        {
          id: "57",
          player1: { name: "TBD", country: "", score: [] },
          player2: { name: "TBD", country: "", score: [] },
          selectedPlayer: null,
        },
        {
          id: "58",
          player1: { name: "TBD", country: "", score: [] },
          player2: { name: "TBD", country: "", score: [] },
          selectedPlayer: null,
        },
        {
          id: "59",
          player1: { name: "TBD", country: "", score: [] },
          player2: { name: "TBD", country: "", score: [] },
          selectedPlayer: null,
        },
        {
          id: "60",
          player1: { name: "TBD", country: "", score: [] },
          player2: { name: "TBD", country: "", score: [] },
          selectedPlayer: null,
        },
      ],
    },
    {
      name: "Semifinals",
      matches: [
        {
          id: "61",
          player1: { name: "TBD", country: "", score: [] },
          player2: { name: "TBD", country: "", score: [] },
          selectedPlayer: null,
        },
        {
          id: "62",
          player1: { name: "TBD", country: "", score: [] },
          player2: { name: "TBD", country: "", score: [] },
          selectedPlayer: null,
        },
      ],
    },
    {
      name: "Final",
      matches: [
        {
          id: "63",
          player1: { name: "TBD", country: "", score: [] },
          player2: { name: "TBD", country: "", score: [] },
          selectedPlayer: null,
        },
      ],
    },
  ],
};
