import {
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { User, UserContextType } from "../types/models";

import { API_CONFIG } from "../config/api";
import CountryFlag from "react-native-country-flag";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";

// Define types for the navigation and route
type RootStackParamList = {
  Tournaments: undefined;
  Picks: { tournament: Tournament | null };
  Standings: { tournament: Tournament | null };
};

type Tournament = {
  id: string;
  name: string;
  location: string;
  date: string;
  countryCode?: string;
};

type PicksScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Picks"
>;
type PicksScreenRouteProp = RouteProp<RootStackParamList, "Picks">;

// Define types for the bracket data
type Player = {
  name: string;
  country: string;
  score: string;
};

type Match = {
  id: string;
  player1: Player;
  player2: Player;
  selectedPlayer: Player | null;
};

type Round = {
  name: string;
  matches: Match[];
};

type BracketData = {
  tournamentName: string;
  tournamentLocation: string;
  tournamentDate: string;
  rounds: Round[];
  isLocked?: boolean;
};

// Mock data for tournament bracket
const mockBracketData: BracketData = {
  tournamentName: "Monte-Carlo Masters",
  tournamentLocation: "Monte Carlo, Monaco",
  tournamentDate: "April 7-14, 2025",
  rounds: [
    {
      name: "Round of 64",
      matches: [
        {
          id: "1",
          player1: { name: "N. Djokovic (1)", country: "RS", score: "" },
          player2: { name: "R. Safiullin", country: "RU", score: "" },
          selectedPlayer: null,
        },
        {
          id: "2",
          player1: { name: "A. Popyrin", country: "AU", score: "" },
          player2: { name: "R. Gasquet (WC)", country: "FR", score: "" },
          selectedPlayer: null,
        },
        {
          id: "3",
          player1: { name: "L. Musetti (13)", country: "IT", score: "" },
          player2: { name: "F. Fognini (WC)", country: "IT", score: "" },
          selectedPlayer: null,
        },
        {
          id: "4",
          player1: { name: "A. Muller", country: "FR", score: "" },
          player2: { name: "C. Alcaraz (2)", country: "ES", score: "" },
          selectedPlayer: null,
        },
        {
          id: "5",
          player1: { name: "D. Medvedev (3)", country: "RU", score: "" },
          player2: { name: "G. Monfils (WC)", country: "FR", score: "" },
          selectedPlayer: null,
        },
        {
          id: "6",
          player1: { name: "G. Dimitrov (15)", country: "BG", score: "" },
          player2: { name: "M. Kecmanovic", country: "RS", score: "" },
          selectedPlayer: null,
        },
        {
          id: "7",
          player1: { name: "A. de Minaur (8)", country: "AU", score: "" },
          player2: { name: "S. Wawrinka (WC)", country: "CH", score: "" },
          selectedPlayer: null,
        },
        {
          id: "8",
          player1: { name: "J. Sinner (4)", country: "IT", score: "" },
          player2: { name: "S. Korda", country: "US", score: "" },
          selectedPlayer: null,
        },
        {
          id: "9",
          player1: { name: "A. Rublev (5)", country: "RU", score: "" },
          player2: { name: "T. Etcheverry", country: "AR", score: "" },
          selectedPlayer: null,
        },
        {
          id: "10",
          player1: { name: "U. Humbert (14)", country: "FR", score: "" },
          player2: { name: "B. Shelton", country: "US", score: "" },
          selectedPlayer: null,
        },
        {
          id: "11",
          player1: { name: "C. Ruud (7)", country: "NO", score: "" },
          player2: { name: "N. Jarry", country: "CL", score: "" },
          selectedPlayer: null,
        },
        {
          id: "12",
          player1: { name: "H. Hurkacz (6)", country: "PL", score: "" },
          player2: { name: "J. Lehecka", country: "CZ", score: "" },
          selectedPlayer: null,
        },
        {
          id: "13",
          player1: { name: "S. Tsitsipas (9)", country: "GR", score: "" },
          player2: { name: "L. Sonego", country: "IT", score: "" },
          selectedPlayer: null,
        },
        {
          id: "14",
          player1: { name: "F. Tiafoe (12)", country: "US", score: "" },
          player2: { name: "M. Berrettini", country: "IT", score: "" },
          selectedPlayer: null,
        },
        {
          id: "15",
          player1: { name: "A. Zverev (10)", country: "DE", score: "" },
          player2: { name: "S. Baez", country: "AR", score: "" },
          selectedPlayer: null,
        },
        {
          id: "16",
          player1: { name: "J. Draper (11)", country: "GB", score: "" },
          player2: { name: "D. Shapovalov", country: "CA", score: "" },
          selectedPlayer: null,
        },
        {
          id: "17",
          player1: { name: "K. Khachanov (16)", country: "RU", score: "" },
          player2: { name: "C. Norrie", country: "GB", score: "" },
          selectedPlayer: null,
        },
        {
          id: "18",
          player1: { name: "B. Coric", country: "HR", score: "" },
          player2: { name: "A. Davidovich Fokina", country: "ES", score: "" },
          selectedPlayer: null,
        },
        {
          id: "19",
          player1: { name: "T. Fritz", country: "US", score: "" },
          player2: { name: "D. Lajovic", country: "RS", score: "" },
          selectedPlayer: null,
        },
        {
          id: "20",
          player1: { name: "A. Bublik", country: "KZ", score: "" },
          player2: { name: "J. Struff", country: "DE", score: "" },
          selectedPlayer: null,
        },
        {
          id: "21",
          player1: { name: "F. Cerundolo", country: "AR", score: "" },
          player2: { name: "M. Fucsovics", country: "HU", score: "" },
          selectedPlayer: null,
        },
        {
          id: "22",
          player1: { name: "R. Bautista Agut", country: "ES", score: "" },
          player2: { name: "A. Mannarino", country: "FR", score: "" },
          selectedPlayer: null,
        },
        {
          id: "23",
          player1: { name: "M. Arnaldi", country: "IT", score: "" },
          player2: { name: "Y. Hanfmann", country: "DE", score: "" },
          selectedPlayer: null,
        },
        {
          id: "24",
          player1: { name: "J. Thompson", country: "AU", score: "" },
          player2: { name: "N. Borges", country: "PT", score: "" },
          selectedPlayer: null,
        },
        {
          id: "25",
          player1: { name: "P. Martinez", country: "ES", score: "" },
          player2: { name: "M. Giron", country: "US", score: "" },
          selectedPlayer: null,
        },
        {
          id: "26",
          player1: { name: "T. Machac", country: "CZ", score: "" },
          player2: { name: "C. Moutet", country: "FR", score: "" },
          selectedPlayer: null,
        },
        {
          id: "27",
          player1: { name: "V. Pospisil", country: "CA", score: "" },
          player2: { name: "R. Carballes Baena", country: "ES", score: "" },
          selectedPlayer: null,
        },
        {
          id: "28",
          player1: { name: "D. Altmaier", country: "DE", score: "" },
          player2: { name: "M. Cressy", country: "US", score: "" },
          selectedPlayer: null,
        },
        {
          id: "29",
          player1: { name: "F. Cobolli", country: "IT", score: "" },
          player2: { name: "B. Nakashima", country: "US", score: "" },
          selectedPlayer: null,
        },
        {
          id: "30",
          player1: { name: "A. Fils", country: "FR", score: "" },
          player2: { name: "D. Koepfer", country: "DE", score: "" },
          selectedPlayer: null,
        },
        {
          id: "31",
          player1: { name: "F. Auger-Aliassime", country: "CA", score: "" },
          player2: { name: "L. Van Assche", country: "FR", score: "" },
          selectedPlayer: null,
        },
        {
          id: "32",
          player1: { name: "J. Munar", country: "ES", score: "" },
          player2: { name: "R. Berankis", country: "LT", score: "" },
          selectedPlayer: null,
        },
      ],
    },
    {
      name: "Round of 32",
      matches: [
        {
          id: "33",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
          selectedPlayer: null,
        },
        {
          id: "34",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
          selectedPlayer: null,
        },
        {
          id: "35",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
          selectedPlayer: null,
        },
        {
          id: "36",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
          selectedPlayer: null,
        },
        {
          id: "37",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
          selectedPlayer: null,
        },
        {
          id: "38",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
          selectedPlayer: null,
        },
        {
          id: "39",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
          selectedPlayer: null,
        },
        {
          id: "40",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
          selectedPlayer: null,
        },
        {
          id: "41",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
          selectedPlayer: null,
        },
        {
          id: "42",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
          selectedPlayer: null,
        },
        {
          id: "43",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
          selectedPlayer: null,
        },
        {
          id: "44",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
          selectedPlayer: null,
        },
        {
          id: "45",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
          selectedPlayer: null,
        },
        {
          id: "46",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
          selectedPlayer: null,
        },
        {
          id: "47",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
          selectedPlayer: null,
        },
        {
          id: "48",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
          selectedPlayer: null,
        },
      ],
    },
    {
      name: "Round of 16",
      matches: [
        {
          id: "49",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
          selectedPlayer: null,
        },
        {
          id: "50",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
          selectedPlayer: null,
        },
        {
          id: "51",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
          selectedPlayer: null,
        },
        {
          id: "52",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
          selectedPlayer: null,
        },
        {
          id: "53",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
          selectedPlayer: null,
        },
        {
          id: "54",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
          selectedPlayer: null,
        },
        {
          id: "55",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
          selectedPlayer: null,
        },
        {
          id: "56",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
          selectedPlayer: null,
        },
      ],
    },
    {
      name: "Quarterfinals",
      matches: [
        {
          id: "57",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
          selectedPlayer: null,
        },
        {
          id: "58",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
          selectedPlayer: null,
        },
        {
          id: "59",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
          selectedPlayer: null,
        },
        {
          id: "60",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
          selectedPlayer: null,
        },
      ],
    },
    {
      name: "Semifinals",
      matches: [
        {
          id: "61",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
          selectedPlayer: null,
        },
        {
          id: "62",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
          selectedPlayer: null,
        },
      ],
    },
    {
      name: "Final",
      matches: [
        {
          id: "63",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
          selectedPlayer: null,
        },
      ],
    },
  ],
};

type MatchProps = {
  match: Match;
  isComplete?: boolean;
  isFinal?: boolean;
  onPlayerSelect?: (player: Player) => void;
  isLocked?: boolean;
};

const Match = ({
  match,
  isComplete,
  isFinal,
  onPlayerSelect,
  isLocked,
}: MatchProps) => {
  const { theme } = useTheme();

  const handlePlayerPress = (player: Player) => {
    if (onPlayerSelect && !isLocked) {
      onPlayerSelect(player);
    }
  };

  // Parse the score string to get individual set scores
  const parseScore = (scoreStr: string) => {
    if (!scoreStr) return [];
    return scoreStr.split(",").map((s) => s.trim());
  };

  const player1Scores = parseScore(match.player1.score);
  const player2Scores = parseScore(match.player2.score);

  const isPlayer1TBD = match.player1.name === "TBD";
  const isPlayer2TBD = match.player2.name === "TBD";

  return (
    <View
      style={[
        styles.matchContainer,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
          borderWidth: isComplete ? 2 : 1,
        },
      ]}
    >
      <View style={styles.matchDetails}>
        <TouchableOpacity
          style={[styles.playerRow, isPlayer1TBD && styles.playerRowDisabled]}
          onPress={() => !isPlayer1TBD && handlePlayerPress(match.player1)}
          disabled={isPlayer1TBD || isLocked}
        >
          <View style={styles.playerInfo}>
            <View
              style={[
                styles.selectionBubble,
                {
                  borderColor: theme.colors.primary,
                  backgroundColor:
                    match.selectedPlayer?.name === match.player1.name
                      ? theme.colors.primary
                      : "transparent",
                },
              ]}
            />
            {match.player1.country ? (
              <CountryFlag
                isoCode={match.player1.country}
                size={16}
                style={styles.flag}
              />
            ) : null}
            <Text
              style={[
                styles.playerName,
                {
                  color: isPlayer1TBD
                    ? theme.colors.secondary
                    : theme.colors.text,
                  fontWeight:
                    match.selectedPlayer?.name === match.player1.name
                      ? "bold"
                      : "normal",
                },
              ]}
            >
              {match.player1.name}
            </Text>
          </View>
          <View style={styles.scoreContainer}>
            {player1Scores.map((score, index) => (
              <Text
                key={index}
                style={[styles.playerScore, { color: theme.colors.text }]}
              >
                {score}
              </Text>
            ))}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.playerRow, isPlayer2TBD && styles.playerRowDisabled]}
          onPress={() => !isPlayer2TBD && handlePlayerPress(match.player2)}
          disabled={isPlayer2TBD || isLocked}
        >
          <View style={styles.playerInfo}>
            <View
              style={[
                styles.selectionBubble,
                {
                  borderColor: theme.colors.primary,
                  backgroundColor:
                    match.selectedPlayer?.name === match.player2.name
                      ? theme.colors.primary
                      : "transparent",
                },
              ]}
            />
            {match.player2.country ? (
              <CountryFlag
                isoCode={match.player2.country}
                size={16}
                style={styles.flag}
              />
            ) : null}
            <Text
              style={[
                styles.playerName,
                {
                  color: isPlayer2TBD
                    ? theme.colors.secondary
                    : theme.colors.text,
                  fontWeight:
                    match.selectedPlayer?.name === match.player2.name
                      ? "bold"
                      : "normal",
                },
              ]}
            >
              {match.player2.name}
            </Text>
          </View>
          <View style={styles.scoreContainer}>
            {player2Scores.map((score, index) => (
              <Text
                key={index}
                style={[styles.playerScore, { color: theme.colors.text }]}
              >
                {score}
              </Text>
            ))}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

type RoundSelectorProps = {
  rounds: Array<{
    name: string;
    matches: Array<{
      id: string;
      player1: { name: string; country: string; score: string };
      player2: { name: string; country: string; score: string };
    }>;
  }>;
  selectedRound: number;
  onRoundSelect: (index: number) => void;
};

const RoundSelector = ({
  rounds,
  selectedRound,
  onRoundSelect,
}: RoundSelectorProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles.roundSelectorContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {rounds.map((round, index) => (
          <TouchableOpacity
            key={round.name}
            style={[
              styles.roundSelectorItem,
              {
                backgroundColor:
                  selectedRound === index
                    ? theme.colors.primary
                    : theme.colors.card,
                borderColor: theme.colors.border,
              },
            ]}
            onPress={() => onRoundSelect(index)}
          >
            <Text
              style={[
                styles.roundSelectorText,
                {
                  color:
                    selectedRound === index
                      ? theme.colors.background
                      : theme.colors.text,
                },
              ]}
            >
              {round.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

// Add savePredictions function
const savePredictions = async (
  tournamentId: string,
  bracketData: BracketData,
  userContext: UserContextType
) => {
  if (!userContext.user?.token) {
    throw new Error("User not authenticated");
  }

  try {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PREDICTIONS}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userContext.user.token}`,
        },
        body: JSON.stringify({
          tournamentId,
          bracketData,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to save predictions");
    }

    const data = await response.json();
    console.log("Predictions saved successfully:", data);
    return data;
  } catch (error) {
    console.error("Error saving predictions:", error);
    throw error;
  }
};

// Add fetchPredictions function
const fetchPredictions = async (tournamentId: string, user: User | null) => {
  if (!user?.token) return null;

  try {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PREDICTIONS}?tournamentId=${tournamentId}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch predictions");
    }

    const predictions = await response.json();
    return predictions[0]; // Return the first prediction if it exists
  } catch (error) {
    console.error("Error fetching predictions:", error);
    return null;
  }
};

export const PicksScreen = ({
  route,
  navigation,
}: {
  route?: PicksScreenRouteProp;
  navigation?: PicksScreenNavigationProp;
}) => {
  const { theme } = useTheme();
  const { user, setUser } = useUser();
  const { tournament } = route?.params || { tournament: null };
  const [selectedRound, setSelectedRound] = useState(0);
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);

  // Store picks data per tournament using tournament ID as key
  const [tournamentPicks, setTournamentPicks] = useState<
    Record<
      string,
      {
        bracketData: BracketData;
        isLocked: boolean;
      }
    >
  >({});

  // Get current tournament's data or initialize with default values
  const currentTournamentId = tournament?.id || "default";
  const currentTournamentData = tournamentPicks[currentTournamentId] || {
    bracketData: mockBracketData,
    isLocked: false,
  };

  // Destructure for easier access
  const { bracketData, isLocked } = currentTournamentData;

  // Update tournament data when tournament changes
  useEffect(() => {
    const loadTournamentData = async () => {
      if (tournament?.id) {
        // Initialize new tournament with default data
        const defaultBracketData = JSON.parse(JSON.stringify(mockBracketData));
        // Initialize selectedPlayer as null for all matches
        defaultBracketData.rounds.forEach((round: Round) => {
          round.matches.forEach((match: Match) => {
            match.selectedPlayer = null;
          });
        });

        setTournamentPicks((prev) => ({
          ...prev,
          [tournament.id]: {
            bracketData: defaultBracketData,
            isLocked: false,
          },
        }));

        // Initialize selectedPlayers array with null values
        const totalMatches = defaultBracketData.rounds.reduce(
          (acc: number, round: Round) => acc + round.matches.length,
          0
        );
        setSelectedPlayers(new Array(totalMatches).fill(null));

        // Try to fetch existing prediction
        const existingPrediction = await fetchPredictions(tournament.id, user);
        if (existingPrediction) {
          // Update selectedPlayers with existing picks
          const updatedSelectedPlayers = [...selectedPlayers];
          let currentMatchIndex = 0;

          existingPrediction.bracketData.rounds.forEach((round: Round) => {
            round.matches.forEach((match: Match) => {
              if (match.selectedPlayer) {
                updatedSelectedPlayers[currentMatchIndex] =
                  match.selectedPlayer;
              }
              currentMatchIndex++;
            });
          });

          setSelectedPlayers(updatedSelectedPlayers);

          // Update tournament data with existing prediction
          setTournamentPicks((prev) => ({
            ...prev,
            [tournament.id]: {
              bracketData: existingPrediction.bracketData,
              isLocked: true,
            },
          }));
        }
      }
      // Reset selected round to 0 when tournament changes
      setSelectedRound(0);
    };

    loadTournamentData();
  }, [tournament, user]);

  const handleRoundSelect = (index: number) => {
    setSelectedRound(index);
  };

  // Function to get a random player from a match
  const getRandomPlayerFromMatch = (
    match: Match
  ): { player: Player; playerId: string } => {
    const isPlayer1 = Math.random() < 0.5;
    return {
      player: isPlayer1 ? match.player1 : match.player2,
      playerId: isPlayer1 ? `player1-${match.id}` : `player2-${match.id}`,
    };
  };

  // Function to auto-pick winners through all rounds
  const handleAutoPick = () => {
    if (!tournament?.id) return;

    // Reset the bracket data to initial state
    const newBracketData = JSON.parse(JSON.stringify(mockBracketData));
    const newSelectedPlayers: Player[] = [];

    // Start with Round of 64
    let currentRoundIndex = 0;
    let currentBracketData = JSON.parse(JSON.stringify(mockBracketData));

    // Process each round
    while (currentRoundIndex < currentBracketData.rounds.length) {
      const currentRound = currentBracketData.rounds[currentRoundIndex];

      // For each match in the current round
      currentRound.matches.forEach((match: Match) => {
        // Skip if both players are TBD
        if (match.player1.name === "TBD" && match.player2.name === "TBD") {
          return;
        }

        // Pick a random winner
        const { player } = getRandomPlayerFromMatch(match);

        // Add to selectedPlayers array
        newSelectedPlayers.push(player);

        // Set the selectedPlayer in the match
        match.selectedPlayer = player;

        // If not the final round, advance to next round
        if (currentRoundIndex < currentBracketData.rounds.length - 1) {
          const nextRoundIndex = currentRoundIndex + 1;
          const nextRound = currentBracketData.rounds[nextRoundIndex];

          // Calculate which match in the next round this player should advance to
          const currentMatchIndex = currentRound.matches.findIndex(
            (m: Match) => m.id === match.id
          );
          const nextMatchIndex = Math.floor(currentMatchIndex / 2);

          if (nextMatchIndex < nextRound.matches.length) {
            const nextMatch = nextRound.matches[nextMatchIndex];
            const isEvenMatch = currentMatchIndex % 2 === 0;

            // Place the player in the appropriate slot
            if (isEvenMatch) {
              nextMatch.player1 = { ...player };
            } else {
              nextMatch.player2 = { ...player };
            }
          }
        }
      });

      // Move to next round
      currentRoundIndex++;
    }

    // Update selectedPlayers state
    setSelectedPlayers(newSelectedPlayers);

    // Update tournament data with the auto-picked results
    setTournamentPicks((prev) => ({
      ...prev,
      [tournament.id]: {
        ...prev[tournament.id],
        bracketData: currentBracketData,
      },
    }));

    // Navigate to the final round
    setSelectedRound(bracketData.rounds.length - 1);
  };

  const handlePlayerSelect = (player: Player, matchIndex: number) => {
    if (!tournament?.id || isLocked) return;

    setSelectedPlayers((prev) => {
      const newSelectedPlayers = [...prev];
      newSelectedPlayers[matchIndex] = player;
      return newSelectedPlayers;
    });

    setTournamentPicks((prev) => {
      const currentTournament = prev[tournament.id];
      if (!currentTournament) return prev;

      const newBracketData = JSON.parse(
        JSON.stringify(currentTournament.bracketData)
      );

      // Find the match and update its selectedPlayer
      let currentMatchIndex = 0;
      newBracketData.rounds.forEach((round: Round) => {
        round.matches.forEach((match: Match) => {
          if (currentMatchIndex === matchIndex) {
            match.selectedPlayer = player;
          }
          currentMatchIndex++;
        });
      });

      return {
        ...prev,
        [tournament.id]: {
          ...currentTournament,
          bracketData: newBracketData,
        },
      };
    });
  };

  // Check if the bracket is fully filled out
  const isBracketComplete = () => {
    // Check each round except the first round (which has initial players)
    for (
      let roundIndex = 1;
      roundIndex < bracketData.rounds.length;
      roundIndex++
    ) {
      const round = bracketData.rounds[roundIndex];

      // Check each match in the round
      for (const match of round.matches) {
        // If any player is TBD, the bracket is not complete
        if (match.player1.name === "TBD" || match.player2.name === "TBD") {
          return false;
        }

        // Check if a winner has been selected for this match
        const matchId = match.id;
        const hasSelection = match.selectedPlayer !== null;

        // If no selection has been made for this match, the bracket is not complete
        if (!hasSelection) {
          return false;
        }
      }
    }

    // If we've checked all rounds and matches and found no TBD players and all matches have selections,
    // the bracket is complete
    return true;
  };

  const lockPicks = (tournamentId: string) => {
    setTournamentPicks((prev) => ({
      ...prev,
      [tournamentId]: {
        ...prev[tournamentId],
        isLocked: true,
      },
    }));
  };

  const handleSavePicks = async () => {
    if (!tournament?.id) {
      Alert.alert("Error", "No tournament selected");
      return;
    }

    if (!isBracketComplete()) {
      Alert.alert(
        "Error",
        "You must fill out the entire bracket before saving your picks."
      );
      return;
    }

    try {
      console.log("bracketData", bracketData);
      await savePredictions(tournament.id, bracketData, { user, setUser });
      lockPicks(tournament.id);
      Alert.alert("Success", "Your picks have been saved!");
    } catch (error) {
      Alert.alert("Error", "Failed to save your picks. Please try again.");
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation?.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={theme.colors.background}
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.background }]}>
          {tournament ? tournament.name : bracketData.tournamentName}
        </Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.autoPickButton}
            onPress={handleAutoPick}
            disabled={isLocked}
          >
            <Text
              style={[
                styles.autoPickText,
                {
                  color: theme.colors.background,
                  opacity: isLocked ? 0.5 : 1,
                },
              ]}
            >
              Auto-pick
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tournamentInfo}>
        <View style={styles.tournamentInfoRow}>
          <Text
            style={[
              styles.tournamentLocation,
              { color: theme.colors.secondary },
            ]}
          >
            {tournament ? tournament.location : bracketData.tournamentLocation}
          </Text>
          <View style={styles.flagContainer}>
            {tournament && tournament.countryCode && (
              <CountryFlag
                isoCode={tournament.countryCode}
                size={20}
                style={styles.tournamentFlag}
              />
            )}
          </View>
        </View>
        <Text
          style={[styles.tournamentDate, { color: theme.colors.secondary }]}
        >
          {tournament ? tournament.date : bracketData.tournamentDate}
        </Text>
      </View>

      <RoundSelector
        rounds={bracketData.rounds}
        selectedRound={selectedRound}
        onRoundSelect={handleRoundSelect}
      />

      <ScrollView style={styles.matchesContainer}>
        <View style={styles.roundContainer}>
          <View style={styles.roundHeader}>
            <Text style={[styles.roundTitle, { color: theme.colors.text }]}>
              {bracketData.rounds[selectedRound].name}
            </Text>
            {selectedRound === bracketData.rounds.length - 1 && !isLocked && (
              <TouchableOpacity
                style={[
                  styles.saveButton,
                  {
                    backgroundColor: theme.colors.primary,
                    opacity: isBracketComplete() ? 1 : 0.5,
                  },
                ]}
                onPress={handleSavePicks}
                disabled={!isBracketComplete()}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: 24,
                  }}
                >
                  <Text
                    style={[
                      styles.saveButtonText,
                      { color: theme.colors.background },
                    ]}
                  >
                    Save Picks
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            {isLocked && (
              <View style={styles.lockedContainer}>
                <Ionicons
                  name="lock-closed"
                  size={16}
                  color={theme.colors.secondary}
                />
                <Text
                  style={[styles.lockedText, { color: theme.colors.secondary }]}
                >
                  Picks Locked
                </Text>
              </View>
            )}
          </View>
          <View style={styles.matchesList}>
            {bracketData.rounds[selectedRound].matches.map((match, index) => {
              const matchIndex =
                bracketData.rounds
                  .slice(0, selectedRound)
                  .reduce((acc, round) => acc + round.matches.length, 0) +
                index;
              return (
                <Match
                  key={match.id}
                  match={match}
                  isComplete={
                    match.player1.score.includes("6-") ||
                    match.player2.score.includes("6-")
                  }
                  isFinal={selectedRound === bracketData.rounds.length - 1}
                  onPlayerSelect={(player) =>
                    handlePlayerSelect(player, matchIndex)
                  }
                  isLocked={isLocked}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  tournamentInfo: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  tournamentInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tournamentLocation: {
    fontSize: 16,
    marginBottom: 4,
    flex: 1,
  },
  tournamentDate: {
    fontSize: 14,
  },
  flagContainer: {
    marginLeft: 8,
    justifyContent: "center",
  },
  tournamentFlag: {
    borderRadius: 2,
  },
  roundSelectorContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  roundSelectorItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 4,
    marginVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  roundSelectorText: {
    fontSize: 14,
    fontWeight: "500",
  },
  matchesContainer: {
    flex: 1,
  },
  roundContainer: {
    padding: 16,
  },
  roundTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  matchesList: {
    gap: 16,
  },
  matchContainer: {
    borderRadius: 8,
    overflow: "hidden",
    padding: 12,
  },
  matchDetails: {
    gap: 8,
  },
  playerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  playerInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  selectionBubble: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    marginRight: 8,
  },
  flag: {
    marginRight: 8,
  },
  playerName: {
    fontSize: 14,
    flex: 1,
  },
  scoreContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  playerScore: {
    fontSize: 14,
    fontWeight: "500",
    minWidth: 20,
    textAlign: "center",
  },
  selectedPlayer: {
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    borderRadius: 4,
  },
  playerRowDisabled: {
    opacity: 0.5,
  },
  autoPickButton: {
    position: "absolute",
    right: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  autoPickText: {
    fontSize: 14,
    fontWeight: "600",
  },
  roundHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  saveButton: {
    paddingHorizontal: 12,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  lockedContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 18,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  lockedText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 4,
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: 0,
    top: 28,
  },
});
