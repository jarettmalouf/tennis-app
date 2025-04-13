import {
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../types/navigation";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";

type AboutScreenNavigationProp = NativeStackNavigationProp<
  ProfileStackParamList,
  "About"
>;

const AboutScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<AboutScreenNavigationProp>();

  const handleVisitWebsite = () => {
    Linking.openURL("https://atpapp.com");
  };

  const handleFollowTwitter = () => {
    Linking.openURL("https://twitter.com/atpapp");
  };

  const appInfo = {
    version: "1.0.0",
    buildNumber: "100",
    description:
      "ATP App is your ultimate companion for tennis predictions and analysis. Stay up to date with the latest matches, make predictions, and compete with friends.",
  };

  const teamMembers = [
    {
      name: "Jarett Malouf",
      role: "Founder & Lead Engineer",
      bio: "Full-stack developer and tennis enthusiast.",
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>About</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.logoSection}>
            <View style={styles.logoContainer}>
              <Ionicons name="tennisball" size={60} color={colors.primary} />
            </View>
            <Text style={[styles.appName, { color: colors.text }]}>
              ATP App
            </Text>
            <Text style={[styles.version, { color: colors.text + "80" }]}>
              Version {appInfo.version} ({appInfo.buildNumber})
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              About
            </Text>
            <Text style={[styles.description, { color: colors.text + "80" }]}>
              {appInfo.description}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Our Team
            </Text>
            {teamMembers.map((member, index) => (
              <View
                key={index}
                style={[styles.teamMember, { backgroundColor: colors.card }]}
              >
                <Text style={[styles.memberName, { color: colors.text }]}>
                  {member.name}
                </Text>
                <Text style={[styles.memberRole, { color: colors.primary }]}>
                  {member.role}
                </Text>
                <Text style={[styles.memberBio, { color: colors.text + "80" }]}>
                  {member.bio}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Connect With Us
            </Text>
            <View style={styles.socialLinks}>
              <TouchableOpacity
                style={[styles.socialButton, { backgroundColor: colors.card }]}
                onPress={handleVisitWebsite}
              >
                <Ionicons
                  name="globe-outline"
                  size={24}
                  color={colors.primary}
                />
                <Text style={[styles.socialText, { color: colors.text }]}>
                  Website
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.socialButton, { backgroundColor: colors.card }]}
                onPress={handleFollowTwitter}
              >
                <Ionicons
                  name="logo-twitter"
                  size={24}
                  color={colors.primary}
                />
                <Text style={[styles.socialText, { color: colors.text }]}>
                  Twitter
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={[styles.copyright, { color: colors.text + "60" }]}>
            © 2024 ATP App. All rights reserved.
          </Text>
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
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  logoContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  version: {
    fontSize: 14,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  teamMember: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  memberName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  memberRole: {
    fontSize: 14,
    marginBottom: 8,
  },
  memberBio: {
    fontSize: 14,
    lineHeight: 20,
  },
  socialLinks: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    width: "45%",
  },
  socialText: {
    marginLeft: 8,
    fontSize: 16,
  },
  copyright: {
    textAlign: "center",
    fontSize: 12,
    marginTop: 20,
  },
});

export default AboutScreen;
