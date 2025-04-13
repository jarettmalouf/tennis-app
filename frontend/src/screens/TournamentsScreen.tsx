import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CommonActions, NavigationProp } from "@react-navigation/native";

import CountryFlag from "react-native-country-flag";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useTheme } from "../context/ThemeContext";

// Temporary type for tournament data
type Tournament = {
  id: string;
  name: string;
  location: string;
  date: string;
  surface: string;
  drawSize: string;
  prizeMoney: string;
  countryCode: string;
};

// Function to determine tournament status based on date
const getTournamentStatus = (dateString: string) => {
  const today = new Date();

  const monthMap: Record<string, number> = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };

  let startMonth: number, endMonth: number;
  let startDay: number, endDay: number;
  const year = parseInt(dateString.split(", ").pop() ?? "");

  const mainPart = dateString.split(", ")[0];
  const parts = mainPart.split(" ");

  if (parts.length === 2 && parts[1].includes("-")) {
    // Format: "Month DD-DD"
    startMonth = endMonth = monthMap[parts[0]];
    [startDay, endDay] = parts[1].split("-").map(Number);
  } else if (parts.length === 3 && parts[1].includes("-")) {
    // Format: "Month DD-Month DD"
    const [startDayStr, endMonthStr] = parts[1].split("-");
    startMonth = monthMap[parts[0]];
    startDay = parseInt(startDayStr);
    endMonth = monthMap[endMonthStr];
    endDay = parseInt(parts[2]);
  } else {
    // Format: "Month DD"
    startMonth = endMonth = monthMap[parts[0]];
    startDay = endDay = parseInt(parts[1]);
  }

  const startDate = new Date(year, startMonth, startDay);
  const endDate = new Date(year, endMonth, endDay);

  const monthNames = Object.keys(monthMap);
  const startDateStr = `${monthNames[startMonth]} ${startDay} ${year}`;
  const endDateStr = `${monthNames[endMonth]} ${endDay} ${year}`;

  if (endDate < today) return "complete";
  if (startDate > today) return "upcoming";
  return "ongoing";
};

// Temporary mock data
const mockTournaments: Tournament[] = [
  {
    id: "1",
    name: "Australian Open",
    location: "Melbourne, Australia",
    date: "January 14-28, 2024",
    surface: "Hard",
    drawSize: "128",
    prizeMoney: "$58,910,000",
    countryCode: "AU",
  },
  {
    id: "2",
    name: "Roland Garros",
    location: "Paris, France",
    date: "May 26-June 9, 2024",
    surface: "Clay",
    drawSize: "128",
    prizeMoney: "$58,910,000",
    countryCode: "FR",
  },
  {
    id: "3",
    name: "Wimbledon",
    location: "London, United Kingdom",
    date: "July 1-14, 2024",
    surface: "Grass",
    drawSize: "128",
    prizeMoney: "$58,910,000",
    countryCode: "GB",
  },
  {
    id: "4",
    name: "US Open",
    location: "New York, USA",
    date: "August 26-September 8, 2024",
    surface: "Hard",
    drawSize: "128",
    prizeMoney: "$58,910,000",
    countryCode: "US",
  },
  {
    id: "5",
    name: "Miami Open",
    location: "Miami, USA",
    date: "March 20-31, 2024",
    surface: "Hard",
    drawSize: "96",
    prizeMoney: "$8,995,555",
    countryCode: "US",
  },
  {
    id: "6",
    name: "Monte-Carlo Masters",
    location: "Monte Carlo, Monaco",
    date: "April 7-14, 2025",
    surface: "Clay",
    drawSize: "56",
    prizeMoney: "$5,950,555",
    countryCode: "MC",
  },
  // Add more tournaments as needed
];

const TournamentItem = ({
  tournament,
  onPress,
}: {
  tournament: Tournament;
  onPress: () => void;
}) => {
  const { theme } = useTheme();
  const status = getTournamentStatus(tournament.date);

  // Render status icon based on tournament status
  const renderStatusIcon = () => {
    switch (status) {
      case "complete":
        return (
          <Ionicons
            name="checkmark-circle"
            size={16}
            color={theme.colors.secondary}
            style={styles.statusIcon}
          />
        );
      case "ongoing":
        return (
          <View
            style={[
              styles.statusDot,
              { backgroundColor: theme.colors.notification },
            ]}
          />
        );
      case "upcoming":
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.tournamentItem, { backgroundColor: theme.colors.card }]}
      onPress={onPress}
    >
      <View style={styles.tournamentHeader}>
        <View style={styles.tournamentTitleContainer}>
          <View style={styles.titleRow}>
            {renderStatusIcon()}
            <Text style={[styles.tournamentName, { color: theme.colors.text }]}>
              {tournament.name}
            </Text>
          </View>
          <Text
            style={[
              styles.tournamentLocation,
              { color: theme.colors.secondary },
            ]}
          >
            {tournament.location}
          </Text>
        </View>
        <CountryFlag
          isoCode={tournament.countryCode}
          size={24}
          style={styles.flag}
        />
      </View>
      <Text style={[styles.tournamentDate, { color: theme.colors.secondary }]}>
        {tournament.date}
      </Text>
      <View style={styles.tournamentDetails}>
        <Text style={[styles.detailText, { color: theme.colors.text }]}>
          Surface: {tournament.surface}
        </Text>
        <Text style={[styles.detailText, { color: theme.colors.text }]}>
          Draw: {tournament.drawSize}
        </Text>
        <Text style={[styles.detailText, { color: theme.colors.text }]}>
          Prize Money: {tournament.prizeMoney}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// Update the navigation type to include the Standings screen
type RootStackParamList = {
  Tournaments: undefined;
  Picks: { tournament: Tournament | null };
  Standings: { tournament: Tournament | null };
};

export const TournamentsScreen = ({
  navigation,
}: {
  navigation: NavigationProp<RootStackParamList>;
}) => {
  const { theme } = useTheme();

  const handleTournamentPress = (tournament: Tournament) => {
    // Navigate directly to Picks screen
    navigation.navigate("Picks", { tournament });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text
        style={[
          styles.header,
          {
            backgroundColor: theme.colors.primary,
            color: theme.colors.background,
          },
        ]}
      >
        ATP Tournaments 2025
      </Text>
      <FlatList
        data={mockTournaments}
        renderItem={({ item }) => (
          <TournamentItem
            tournament={item}
            onPress={() => handleTournamentPress(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
  },
  listContainer: {
    padding: 16,
  },
  tournamentItem: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tournamentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  tournamentTitleContainer: {
    flex: 1,
    marginRight: 8,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  tournamentName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  tournamentLocation: {
    fontSize: 16,
  },
  tournamentDate: {
    fontSize: 14,
    marginBottom: 8,
  },
  tournamentDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  detailText: {
    fontSize: 14,
  },
  flag: {
    borderRadius: 2,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  statusIcon: {
    marginRight: 4,
  },
});
