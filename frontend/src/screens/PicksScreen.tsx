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

import CountryFlag from "react-native-country-flag";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";

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
        },
        {
          id: "2",
          player1: { name: "A. Popyrin", country: "AU", score: "" },
          player2: { name: "R. Gasquet (WC)", country: "FR", score: "" },
        },
        {
          id: "3",
          player1: { name: "L. Musetti (13)", country: "IT", score: "" },
          player2: { name: "F. Fognini (WC)", country: "IT", score: "" },
        },
        {
          id: "4",
          player1: { name: "A. Muller", country: "FR", score: "" },
          player2: { name: "C. Alcaraz (2)", country: "ES", score: "" },
        },
        {
          id: "5",
          player1: { name: "D. Medvedev (3)", country: "RU", score: "" },
          player2: { name: "G. Monfils (WC)", country: "FR", score: "" },
        },
        {
          id: "6",
          player1: { name: "G. Dimitrov (15)", country: "BG", score: "" },
          player2: { name: "M. Kecmanovic", country: "RS", score: "" },
        },
        {
          id: "7",
          player1: { name: "A. de Minaur (8)", country: "AU", score: "" },
          player2: { name: "S. Wawrinka (WC)", country: "CH", score: "" },
        },
        {
          id: "8",
          player1: { name: "J. Sinner (4)", country: "IT", score: "" },
          player2: { name: "S. Korda", country: "US", score: "" },
        },
        {
          id: "9",
          player1: { name: "A. Rublev (5)", country: "RU", score: "" },
          player2: { name: "T. Etcheverry", country: "AR", score: "" },
        },
        {
          id: "10",
          player1: { name: "U. Humbert (14)", country: "FR", score: "" },
          player2: { name: "B. Shelton", country: "US", score: "" },
        },
        {
          id: "11",
          player1: { name: "C. Ruud (7)", country: "NO", score: "" },
          player2: { name: "N. Jarry", country: "CL", score: "" },
        },
        {
          id: "12",
          player1: { name: "H. Hurkacz (6)", country: "PL", score: "" },
          player2: { name: "J. Lehecka", country: "CZ", score: "" },
        },
        {
          id: "13",
          player1: { name: "S. Tsitsipas (9)", country: "GR", score: "" },
          player2: { name: "L. Sonego", country: "IT", score: "" },
        },
        {
          id: "14",
          player1: { name: "F. Tiafoe (12)", country: "US", score: "" },
          player2: { name: "M. Berrettini", country: "IT", score: "" },
        },
        {
          id: "15",
          player1: { name: "A. Zverev (10)", country: "DE", score: "" },
          player2: { name: "S. Baez", country: "AR", score: "" },
        },
        {
          id: "16",
          player1: { name: "J. Draper (11)", country: "GB", score: "" },
          player2: { name: "D. Shapovalov", country: "CA", score: "" },
        },
        {
          id: "17",
          player1: { name: "K. Khachanov (16)", country: "RU", score: "" },
          player2: { name: "C. Norrie", country: "GB", score: "" },
        },
        {
          id: "18",
          player1: { name: "B. Coric", country: "HR", score: "" },
          player2: { name: "A. Davidovich Fokina", country: "ES", score: "" },
        },
        {
          id: "19",
          player1: { name: "T. Fritz", country: "US", score: "" },
          player2: { name: "D. Lajovic", country: "RS", score: "" },
        },
        {
          id: "20",
          player1: { name: "A. Bublik", country: "KZ", score: "" },
          player2: { name: "J. Struff", country: "DE", score: "" },
        },
        {
          id: "21",
          player1: { name: "F. Cerundolo", country: "AR", score: "" },
          player2: { name: "M. Fucsovics", country: "HU", score: "" },
        },
        {
          id: "22",
          player1: { name: "R. Bautista Agut", country: "ES", score: "" },
          player2: { name: "A. Mannarino", country: "FR", score: "" },
        },
        {
          id: "23",
          player1: { name: "M. Arnaldi", country: "IT", score: "" },
          player2: { name: "Y. Hanfmann", country: "DE", score: "" },
        },
        {
          id: "24",
          player1: { name: "J. Thompson", country: "AU", score: "" },
          player2: { name: "N. Borges", country: "PT", score: "" },
        },
        {
          id: "25",
          player1: { name: "P. Martinez", country: "ES", score: "" },
          player2: { name: "M. Giron", country: "US", score: "" },
        },
        {
          id: "26",
          player1: { name: "T. Machac", country: "CZ", score: "" },
          player2: { name: "C. Moutet", country: "FR", score: "" },
        },
        {
          id: "27",
          player1: { name: "V. Pospisil", country: "CA", score: "" },
          player2: { name: "R. Carballes Baena", country: "ES", score: "" },
        },
        {
          id: "28",
          player1: { name: "D. Altmaier", country: "DE", score: "" },
          player2: { name: "M. Cressy", country: "US", score: "" },
        },
        {
          id: "29",
          player1: { name: "F. Cobolli", country: "IT", score: "" },
          player2: { name: "B. Nakashima", country: "US", score: "" },
        },
        {
          id: "30",
          player1: { name: "A. Fils", country: "FR", score: "" },
          player2: { name: "D. Koepfer", country: "DE", score: "" },
        },
        {
          id: "31",
          player1: { name: "F. Auger-Aliassime", country: "CA", score: "" },
          player2: { name: "L. Van Assche", country: "FR", score: "" },
        },
        {
          id: "32",
          player1: { name: "J. Munar", country: "ES", score: "" },
          player2: { name: "R. Berankis", country: "LT", score: "" },
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
        },
        {
          id: "34",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
        },
        {
          id: "35",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
        },
        {
          id: "36",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
        },
        {
          id: "37",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
        },
        {
          id: "38",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
        },
        {
          id: "39",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
        },
        {
          id: "40",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
        },
        {
          id: "41",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
        },
        {
          id: "42",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
        },
        {
          id: "43",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
        },
        {
          id: "44",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
        },
        {
          id: "45",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
        },
        {
          id: "46",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
        },
        {
          id: "47",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
        },
        {
          id: "48",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
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
        },
        {
          id: "50",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
        },
        {
          id: "51",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
        },
        {
          id: "52",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
        },
        {
          id: "53",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
        },
        {
          id: "54",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
        },
        {
          id: "55",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
        },
        {
          id: "56",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
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
        },
        {
          id: "58",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
        },
        {
          id: "59",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
        },
        {
          id: "60",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
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
        },
        {
          id: "62",
          player1: { name: "TBD", country: "", score: "" },
          player2: { name: "TBD", country: "", score: "" },
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
        },
      ],
    },
  ],
};

type MatchProps = {
  match: {
    id: string;
    player1: { name: string; country: string; score: string };
    player2: { name: string; country: string; score: string };
  };
  isWinner?: boolean;
  isFinal?: boolean;
  onPlayerSelect?: (playerId: string) => void;
  selectedPlayerId?: string;
};

const Match = ({
  match,
  isWinner,
  isFinal,
  onPlayerSelect,
  selectedPlayerId,
}: MatchProps) => {
  const { theme } = useTheme();

  const handlePlayerPress = (playerId: string) => {
    if (onPlayerSelect) {
      onPlayerSelect(playerId);
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
          borderWidth: isWinner ? 2 : 1,
        },
      ]}
    >
      <View style={styles.matchDetails}>
        <TouchableOpacity
          style={[styles.playerRow, isPlayer1TBD && styles.playerRowDisabled]}
          onPress={() =>
            !isPlayer1TBD && handlePlayerPress(`player1-${match.id}`)
          }
          disabled={isPlayer1TBD}
        >
          <View style={styles.playerInfo}>
            <View
              style={[
                styles.selectionBubble,
                {
                  borderColor: theme.colors.primary,
                  backgroundColor:
                    selectedPlayerId === `player1-${match.id}`
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
                    selectedPlayerId === `player1-${match.id}`
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
          onPress={() =>
            !isPlayer2TBD && handlePlayerPress(`player2-${match.id}`)
          }
          disabled={isPlayer2TBD}
        >
          <View style={styles.playerInfo}>
            <View
              style={[
                styles.selectionBubble,
                {
                  borderColor: theme.colors.primary,
                  backgroundColor:
                    selectedPlayerId === `player2-${match.id}`
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
                    selectedPlayerId === `player2-${match.id}`
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

export const PicksScreen = ({
  route,
  navigation,
}: {
  route?: PicksScreenRouteProp;
  navigation?: PicksScreenNavigationProp;
}) => {
  const { theme } = useTheme();
  const { tournament } = route?.params || { tournament: null };
  const [selectedRound, setSelectedRound] = useState(0);

  // Store picks data per tournament using tournament ID as key
  const [tournamentPicks, setTournamentPicks] = useState<
    Record<
      string,
      {
        selectedPlayers: Record<string, string>;
        bracketData: BracketData;
        isLocked: boolean;
      }
    >
  >({});

  // Get current tournament's data or initialize with default values
  const currentTournamentId = tournament?.id || "default";
  const currentTournamentData = tournamentPicks[currentTournamentId] || {
    selectedPlayers: {},
    bracketData: mockBracketData,
    isLocked: false,
  };

  // Destructure for easier access
  const { selectedPlayers, bracketData, isLocked } = currentTournamentData;

  // Update tournament data when tournament changes
  useEffect(() => {
    if (tournament?.id && !tournamentPicks[tournament.id]) {
      // Initialize new tournament with default data
      setTournamentPicks((prev) => ({
        ...prev,
        [tournament.id]: {
          selectedPlayers: {},
          bracketData: mockBracketData,
          isLocked: false,
        },
      }));
    }
  }, [tournament]);

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
    const newSelectedPlayers: Record<string, string> = {};

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
        const { player, playerId } = getRandomPlayerFromMatch(match);

        // Add to selections
        newSelectedPlayers[playerId] = playerId;

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

    // Update tournament data with the auto-picked results
    setTournamentPicks((prev) => ({
      ...prev,
      [tournament.id]: {
        ...prev[tournament.id],
        selectedPlayers: newSelectedPlayers,
        bracketData: currentBracketData,
      },
    }));
  };

  const handlePlayerSelect = (playerId: string) => {
    if (!tournament?.id) return;

    // Extract the match ID and player number from the player ID
    const [playerNum, matchId] = playerId.split("-");
    const isPlayer1 = playerNum === "player1";

    // Find the current match and round
    const currentRound = bracketData.rounds[selectedRound];
    const currentMatch = currentRound.matches.find(
      (match) => match.id === matchId
    );

    if (!currentMatch) return;

    // Get the selected player's data
    const selectedPlayer = isPlayer1
      ? currentMatch.player1
      : currentMatch.player2;
    const otherPlayer = isPlayer1 ? currentMatch.player2 : currentMatch.player1;

    // Find the previously selected player in this match (if any)
    const previouslySelectedPlayerId = Object.keys(selectedPlayers).find((id) =>
      id.includes(`-${matchId}`)
    );

    let previouslySelectedPlayer = null;
    if (previouslySelectedPlayerId) {
      const [prevPlayerNum] = previouslySelectedPlayerId.split("-");
      const wasPlayer1 = prevPlayerNum === "player1";
      previouslySelectedPlayer = wasPlayer1
        ? currentMatch.player1
        : currentMatch.player2;
    }

    // Create new selections object
    const newSelections = { ...selectedPlayers };

    // Remove selection for current match
    delete newSelections[`player1-${matchId}`];
    delete newSelections[`player2-${matchId}`];

    // Add new selection
    newSelections[playerId] = playerId;

    // Only remove selections for matches that contain the previously selected player
    if (previouslySelectedPlayer) {
      // Find all matches in subsequent rounds that contain the previously selected player
      for (
        let roundIndex = selectedRound + 1;
        roundIndex < bracketData.rounds.length;
        roundIndex++
      ) {
        const round = bracketData.rounds[roundIndex];
        round.matches.forEach((match) => {
          if (
            match.player1.name === previouslySelectedPlayer.name ||
            match.player2.name === previouslySelectedPlayer.name
          ) {
            // Remove selections for this match
            delete newSelections[`player1-${match.id}`];
            delete newSelections[`player2-${match.id}`];
          }
        });
      }
    }

    // Create new bracket data
    const newBracketData = JSON.parse(JSON.stringify(bracketData));

    // Find the next round
    const nextRoundIndex = selectedRound + 1;
    if (nextRoundIndex < newBracketData.rounds.length) {
      // Calculate next match position
      const currentMatchIndex = currentRound.matches.findIndex(
        (m) => m.id === matchId
      );
      const nextMatchIndex = Math.floor(currentMatchIndex / 2);
      const isEvenMatch = currentMatchIndex % 2 === 0;

      // Update next round match
      if (
        nextMatchIndex < newBracketData.rounds[nextRoundIndex].matches.length
      ) {
        const nextMatch =
          newBracketData.rounds[nextRoundIndex].matches[nextMatchIndex];

        // Check if the previously selected player is in the next match
        if (previouslySelectedPlayer) {
          if (nextMatch.player1.name === previouslySelectedPlayer.name) {
            nextMatch.player1 = { name: "TBD", country: "", score: "" };
          }
          if (nextMatch.player2.name === previouslySelectedPlayer.name) {
            nextMatch.player2 = { name: "TBD", country: "", score: "" };
          }
        }

        // Place the newly selected player in the appropriate slot
        if (isEvenMatch) {
          nextMatch.player1 = { ...selectedPlayer };
        } else {
          nextMatch.player2 = { ...selectedPlayer };
        }
      }

      // Clear affected downstream matches
      for (
        let roundIndex = nextRoundIndex + 1;
        roundIndex < newBracketData.rounds.length;
        roundIndex++
      ) {
        const round = newBracketData.rounds[roundIndex];
        round.matches.forEach((match: Match) => {
          // Clear matches that contain the previously selected player
          if (previouslySelectedPlayer) {
            if (match.player1.name === previouslySelectedPlayer.name) {
              match.player1 = { name: "TBD", country: "", score: "" };
            }
            if (match.player2.name === previouslySelectedPlayer.name) {
              match.player2 = { name: "TBD", country: "", score: "" };
            }
          }

          // Clear matches that contain the other player from the current match
          if (match.player1.name === otherPlayer.name) {
            match.player1 = { name: "TBD", country: "", score: "" };
          }
          if (match.player2.name === otherPlayer.name) {
            match.player2 = { name: "TBD", country: "", score: "" };
          }

          // Clear matches that contain the newly selected player
          if (match.player1.name === selectedPlayer.name) {
            match.player1 = { name: "TBD", country: "", score: "" };
          }
          if (match.player2.name === selectedPlayer.name) {
            match.player2 = { name: "TBD", country: "", score: "" };
          }
        });
      }
    }

    // Update tournament data with new selections and bracket data
    setTournamentPicks((prev) => ({
      ...prev,
      [tournament.id]: {
        ...prev[tournament.id],
        selectedPlayers: newSelections,
        bracketData: newBracketData,
      },
    }));
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
        const hasSelection =
          selectedPlayers[`player1-${matchId}`] ||
          selectedPlayers[`player2-${matchId}`];

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

  const handleSavePicks = () => {
    if (!tournament?.id) return;

    // Check if the bracket is complete before allowing save
    if (!isBracketComplete()) {
      alert("You must fill out the entire bracket before saving your picks.");
      return;
    }

    // Show a confirmation message
    Alert.alert(
      "🔒",
      "Are you sure you want to lock your picks? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Save",
          onPress: () => {
            // Update tournament data to mark it as locked
            setTournamentPicks((prev) => ({
              ...prev,
              [tournament.id]: {
                ...prev[tournament.id],
                isLocked: true,
              },
            }));
          },
        },
      ]
    );
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
            {bracketData.rounds[selectedRound].matches.map((match) => (
              <Match
                key={match.id}
                match={match}
                isWinner={
                  match.player1.score.includes("6-") ||
                  match.player2.score.includes("6-")
                }
                isFinal={selectedRound === bracketData.rounds.length - 1}
                onPlayerSelect={isLocked ? undefined : handlePlayerSelect}
                selectedPlayerId={
                  selectedPlayers[`player1-${match.id}`] ||
                  selectedPlayers[`player2-${match.id}`]
                }
              />
            ))}
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
