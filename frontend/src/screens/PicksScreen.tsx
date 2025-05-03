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
import {
  BracketData,
  Match as MatchType,
  Player,
  Round,
  SetScore,
} from "../types/bracket";
import React, { useEffect, useState } from "react";
import { User, UserContextType } from "../types/models";

import { API_CONFIG } from "../config/api";
import CountryFlag from "react-native-country-flag";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { mockBracketData } from "../data/mockBracketData";
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

const setWon = (
  score: SetScore,
  opponentScore: SetScore | undefined
): boolean => {
  if (!score || !opponentScore) return false;

  const p1Games = score.gamesWon;
  const p2Games = opponentScore.gamesWon;

  return (
    (p1Games >= 6 && p1Games - p2Games >= 2) || (p1Games === 7 && p2Games === 6)
  );
};

const isComplete = (
  player1: Player,
  player2: Player,
  bestOf: number = 3
): boolean => {
  return winner(player1, player2, bestOf) !== null;
};

const winner = (
  player1: Player,
  player2: Player,
  bestOf: number = 3
): Player | null => {
  if (!player1.score || !player2.score) return null;
  const setsToWin = Math.ceil(bestOf / 2);
  const sets = Math.max(player1.score.length, player2.score.length);
  let player1SetsWon = 0;
  let player2SetsWon = 0;

  for (let i = 0; i < sets; i++) {
    const p1Score = player1.score[i] ?? { gamesWon: 0 };
    const p2Score = player2.score[i] ?? { gamesWon: 0 };

    if (setWon(p1Score, p2Score)) {
      player1SetsWon++;
    } else if (setWon(p2Score, p1Score)) {
      player2SetsWon++;
    }

    if (player1SetsWon === setsToWin) {
      return player1;
    }
    if (player2SetsWon === setsToWin) {
      return player2;
    }
  }

  return null;
};

type MatchProps = {
  match: MatchType;
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

  const renderScore = (score: SetScore, setWon: boolean) => {
    if (!score) return null;
    return (
      <View style={styles.scoreWrapper}>
        <Text
          style={[
            styles.playerScore,
            { color: theme.colors.text, fontWeight: setWon ? "800" : "500" },
          ]}
        >
          {score.gamesWon}
        </Text>
        {score.tiebreakPointsWon !== undefined && !setWon && (
          <Text
            style={[
              styles.tiebreakScore,
              { fontWeight: setWon ? "800" : "500" },
            ]}
          >
            {score.tiebreakPointsWon}
          </Text>
        )}
      </View>
    );
  };

  return (
    <View
      style={[
        isFinal ? styles.matchContainerFinal : styles.matchContainer,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
          borderWidth: isComplete ? 2 : 1,
        },
      ]}
    >
      <View style={styles.matchDetails}>
        {[match.player1, match.player2].map((player, idx) => {
          const isTBD = player.name === "TBD";
          const isSelected = match.selectedPlayer?.name === player.name;
          const score = player.score;
          const otherPlayer =
            match.player1.name === player.name ? match.player2 : match.player1;

          return (
            <TouchableOpacity
              key={player.name + idx}
              style={[styles.playerRow, isTBD && styles.playerRowDisabled]}
              onPress={() => !isTBD && handlePlayerPress(player)}
              disabled={isTBD || isLocked}
            >
              <View style={styles.playerInfo}>
                <View
                  style={[
                    styles.selectionBubble,
                    {
                      borderColor: theme.colors.primary,
                      backgroundColor: isSelected
                        ? theme.colors.primary
                        : "transparent",
                    },
                  ]}
                />
                {player.country ? (
                  <CountryFlag
                    isoCode={player.country}
                    size={16}
                    style={styles.flag}
                  />
                ) : null}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ padding: 4 }}>
                    <Text
                      style={[
                        styles.playerName,
                        {
                          color: isTBD
                            ? theme.colors.secondary
                            : theme.colors.text,
                          fontWeight: isSelected ? "bold" : "normal",
                        },
                      ]}
                    >
                      {player.name}
                    </Text>
                  </View>
                  {winner(match.player1, match.player2) === player && (
                    <View style={{ marginBottom: 2 }}>
                      <Ionicons
                        name="checkmark-circle"
                        size={16}
                        color="#4CAF50"
                        style={styles.checkIcon}
                      />
                    </View>
                  )}
                </View>
              </View>

              {score?.length > 0 && (
                <View style={styles.scoreContainer}>
                  {score.map((_score, index) => {
                    console.log("Score:", _score);
                    console.log(
                      "Other player score:",
                      otherPlayer.score?.[index]
                    );
                    return (
                      <View key={index} style={styles.setScoreContainer}>
                        {renderScore(
                          _score,
                          setWon(_score, otherPlayer.score?.[index])
                        )}
                      </View>
                    );
                  })}
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

type RoundSelectorProps = {
  rounds: Array<{
    name: string;
    matches: Array<{
      id: string;
      player1: { name: string; country: string; score: SetScore[] };
      player2: { name: string; country: string; score: SetScore[] };
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

const getMatchContainerStyle = (isFinal: boolean) => ({
  borderRadius: 8,
  overflow: "hidden",
  padding: 12,
  width: isFinal ? 400 : 350,
  alignSelf: "center",
});

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
          round.matches.forEach((match: MatchType) => {
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
            round.matches.forEach((match: MatchType) => {
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
    match: MatchType
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
      currentRound.matches.forEach((match: MatchType) => {
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
            (m: MatchType) => m.id === match.id
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
        round.matches.forEach((match: MatchType) => {
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

  const isFinal = selectedRound === bracketData.rounds.length - 1;

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
              if (index % 2 !== 0) return null; // Render every other match as a pair start

              const nextMatch =
                bracketData.rounds[selectedRound].matches[index + 1];
              const matchIndexOffset = bracketData.rounds
                .slice(0, selectedRound)
                .reduce((acc, round) => acc + round.matches.length, 0);

              return (
                <View key={`pair-${index}`} style={styles.matchPairContainer}>
                  <View style={styles.matchPairContent}>
                    <Match
                      match={match}
                      isComplete={isComplete(match.player1, match.player2)}
                      isFinal={isFinal}
                      onPlayerSelect={(player) =>
                        handlePlayerSelect(player, matchIndexOffset + index)
                      }
                      isLocked={isLocked}
                    />
                    {nextMatch && (
                      <Match
                        match={nextMatch}
                        isComplete={isComplete(
                          nextMatch.player1,
                          nextMatch.player2
                        )}
                        isFinal={isFinal}
                        onPlayerSelect={(player) =>
                          handlePlayerSelect(
                            player,
                            matchIndexOffset + index + 1
                          )
                        }
                        isLocked={isLocked}
                      />
                    )}
                  </View>
                  {!isFinal && <View style={styles.rightBracketLine} />}
                  {!isFinal && <View style={styles.rightHorizontalLine} />}
                </View>
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
    margin: 16,
  },
  roundTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  matchesList: {
    gap: 0,
  },
  matchContainer: {
    borderRadius: 8,
    overflow: "hidden",
    padding: 12,
    width: 350,
    alignSelf: "center",
  },
  matchContainerFinal: {
    borderRadius: 8,
    overflow: "hidden",
    padding: 12,
    width: 400,
    alignSelf: "center",
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
  scoreWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    position: "relative",
  },
  playerScore: {
    fontSize: 14,
    textAlign: "center",
  },
  tiebreakScore: {
    fontSize: 10,
    marginLeft: 0,
    marginTop: -6,
  },
  setScoreContainer: {
    width: 20,
    alignItems: "center",
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
  checkIcon: {
    marginLeft: 8,
    marginTop: 2,
  },
  matchPair: {
    flexDirection: "column",
    alignItems: "flex-start",
    position: "relative",
    paddingRight: 24,
  },
  matchWithLine: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8, // add spacing between matches
  },
  horizontalLine: {
    width: 24,
    height: 2,
    backgroundColor: "#ccc",
    marginLeft: 4,
  },
  verticalLine: {
    width: 2,
    height: 135, // longer to span the spacing
    backgroundColor: "#ccc",
    position: "absolute",
    left: "100%",
    marginTop: 66,
    marginLeft: 8, // half of height to center between matches
  },
  matchPairContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    width: 450, // enough to hit the right edge of the screen
  },
  matchPairContent: {
    gap: 24, // spacing between matches in a pair
  },
  rightBracketLine: {
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 0,
    borderColor: "#ccc",
    height: 135,
    width: 33,
  },
  rightHorizontalLine: {
    height: 2,
    backgroundColor: "#ccc",
    flex: 1,
    marginLeft: 0,
  },
});
