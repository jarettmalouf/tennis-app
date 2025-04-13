import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import CountryFlag from "react-native-country-flag";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

// Define the Tournament type
type Tournament = {
  id: string;
  name: string;
  location: string;
  date: string;
  countryCode?: string;
  status: "upcoming" | "ongoing" | "completed";
};

// Define the UserPerformance type
type UserPerformance = {
  userName: string;
  profileImage: string;
  predictedWinner: string;
  livePoints: number;
  totalAchievablePoints: number;
};

// Mock data for tournaments
const mockTournaments: Tournament[] = [
  {
    id: "1",
    name: "Monte Carlo Masters",
    location: "Monte Carlo, Monaco",
    date: "Apr 7-14, 2025",
    countryCode: "MC",
    status: "ongoing",
  },
  {
    id: "2",
    name: "Madrid Open",
    location: "Madrid, Spain",
    date: "Apr 22-28, 2024",
    countryCode: "ES",
    status: "upcoming",
  },
  {
    id: "3",
    name: "Italian Open",
    location: "Rome, Italy",
    date: "May 6-19, 2024",
    countryCode: "IT",
    status: "upcoming",
  },
  {
    id: "4",
    name: "French Open",
    location: "Paris, France",
    date: "May 26-Jun 9, 2024",
    countryCode: "FR",
    status: "upcoming",
  },
  {
    id: "5",
    name: "Wimbledon",
    location: "London, UK",
    date: "Jul 1-14, 2024",
    countryCode: "GB",
    status: "upcoming",
  },
  {
    id: "6",
    name: "US Open",
    location: "New York, USA",
    date: "Aug 26-Sep 8, 2024",
    countryCode: "US",
    status: "upcoming",
  },
];

// Mock data for user performance
const mockUserPerformance: Record<string, UserPerformance[]> = {
  "1": [
    {
      userName: "Jarett",
      profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
      predictedWinner: "N. Djokovic",
      livePoints: 320,
      totalAchievablePoints: 1000,
    },
    {
      userName: "Alex",
      profileImage: "https://randomuser.me/api/portraits/men/45.jpg",
      predictedWinner: "C. Alcaraz",
      livePoints: 280,
      totalAchievablePoints: 1000,
    },
    {
      userName: "Sarah",
      profileImage: "https://randomuser.me/api/portraits/women/68.jpg",
      predictedWinner: "D. Medvedev",
      livePoints: 150,
      totalAchievablePoints: 1000,
    },
  ],
};

const StandingsScreen = () => {
  const { colors } = useTheme();
  const [tournaments, setTournaments] = useState<Tournament[]>(mockTournaments);

  // Filter to show only ongoing tournaments
  const ongoingTournaments = tournaments.filter(
    (tournament) => tournament.status === "ongoing"
  );

  const renderPerformanceSection = (tournamentId: string) => {
    const performances = mockUserPerformance[tournamentId];
    if (!performances || performances.length === 0) return null;

    return (
      <View style={styles.performanceContainer}>
        <View style={styles.tableHeader}>
          <View
            style={[
              styles.tableHeaderCell,
              { flex: 0.5, alignItems: "center" },
            ]}
          >
            <Text style={{ color: colors.text }}></Text>
          </View>
          <View style={[styles.tableHeaderCell, { flex: 1.5 }]}>
            <Text style={{ color: colors.text, fontWeight: "bold" }}>Pick</Text>
          </View>
          <View style={[styles.tableHeaderCell, { flex: 0.8 }]}>
            <Text style={{ color: colors.text, fontWeight: "bold" }}>Live</Text>
          </View>
          <View style={[styles.tableHeaderCell, { flex: 0.8 }]}>
            <Text style={{ color: colors.text, fontWeight: "bold" }}>Max</Text>
          </View>
        </View>

        {performances.map((performance, index) => (
          <View
            key={`${performance.userName}-${index}`}
            style={[styles.tableRow, { borderBottomColor: colors.border }]}
          >
            <View
              style={[styles.tableCell, { flex: 0.5, alignItems: "center" }]}
            >
              <Image
                source={{ uri: performance.profileImage }}
                style={styles.profileImage}
              />
            </View>
            <View style={[styles.tableCell, { flex: 1.5 }]}>
              <Text
                style={{
                  color: colors.text,
                  fontWeight: index === 0 ? "bold" : "normal",
                }}
              >
                {performance.predictedWinner}
              </Text>
            </View>
            <View style={[styles.tableCell, { flex: 0.8 }]}>
              <Text
                style={{
                  color: colors.text,
                  fontWeight: index === 0 ? "bold" : "normal",
                }}
              >
                {performance.livePoints}
              </Text>
            </View>
            <View style={[styles.tableCell, { flex: 0.8 }]}>
              <Text
                style={{
                  color: colors.text,
                  fontWeight: index === 0 ? "bold" : "normal",
                }}
              >
                {performance.totalAchievablePoints}
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderTournamentItem = ({ item }: { item: Tournament }) => (
    <TouchableOpacity
      style={[styles.tournamentCard, { backgroundColor: colors.card }]}
      onPress={() => {
        // Handle tournament selection
        console.log(`Selected tournament: ${item.name}`);
      }}
    >
      <View style={styles.tournamentHeader}>
        <Text style={[styles.tournamentName, { color: colors.text }]}>
          {item.name}
        </Text>
        {item.countryCode && (
          <CountryFlag
            isoCode={item.countryCode}
            size={20}
            style={styles.countryFlag}
          />
        )}
      </View>
      <View style={styles.tournamentDetails}>
        <View style={styles.detailRow}>
          <Ionicons
            name="location-outline"
            size={16}
            color={colors.text}
            style={styles.icon}
          />
          <Text style={[styles.detailText, { color: colors.text }]}>
            {item.location}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons
            name="calendar-outline"
            size={16}
            color={colors.text}
            style={styles.icon}
          />
          <Text style={[styles.detailText, { color: colors.text }]}>
            {item.date}
          </Text>
        </View>
      </View>

      {renderPerformanceSection(item.id)}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Ongoing Tournaments
          </Text>
        </View>

        {ongoingTournaments.length > 0 ? (
          <FlatList
            data={ongoingTournaments}
            renderItem={renderTournamentItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="trophy-outline"
              size={64}
              color={colors.text}
              style={styles.emptyIcon}
            />
            <Text style={[styles.emptyText, { color: colors.text }]}>
              No ongoing tournaments at the moment
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  listContainer: {
    padding: 16,
  },
  tournamentCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tournamentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  tournamentName: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  countryFlag: {
    borderRadius: 2,
    marginLeft: 8,
  },
  tournamentDetails: {
    marginTop: 8,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
  },
  performanceContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  tableCell: {
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  tableHeaderCell: {
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  emptyIcon: {
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

export default StandingsScreen;
