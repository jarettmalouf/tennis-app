import React, { useState } from "react";
import {
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
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";

type LegalScreenNavigationProp = NativeStackNavigationProp<
  ProfileStackParamList,
  "Legal"
>;

const LegalScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<LegalScreenNavigationProp>();
  const [activeTab, setActiveTab] = useState<"terms" | "privacy">("terms");

  const termsOfService = `
Terms of Service

1. Acceptance of Terms
By accessing and using ATP App, you agree to be bound by these Terms of Service.

2. User Responsibilities
- You must be at least 13 years old to use this app
- You are responsible for maintaining the confidentiality of your account
- You agree to provide accurate information

3. User Conduct
Users must not:
- Violate any laws or regulations
- Impersonate others
- Share inappropriate content
- Attempt to manipulate the prediction system

4. Intellectual Property
All content and materials available in ATP App are protected by intellectual property rights.

5. Termination
We reserve the right to terminate or suspend access to our service immediately, without prior notice, for any breach of these Terms.
`;

  const privacyPolicy = `
Privacy Policy

1. Information We Collect
- Account information (email, name)
- Usage data
- Device information
- Prediction history

2. How We Use Your Information
- To provide and maintain our service
- To notify you about changes
- To provide customer support
- To gather analysis or valuable information

3. Data Security
We implement appropriate security measures to protect your personal information.

4. Third-Party Services
We may employ third-party companies to facilitate our service.

5. Children's Privacy
Our service does not address anyone under the age of 13.

6. Changes to This Policy
We may update our Privacy Policy from time to time.
`;

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
        <Text style={[styles.headerTitle, { color: colors.text }]}>Legal</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "terms" && { borderBottomColor: colors.primary },
          ]}
          onPress={() => setActiveTab("terms")}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === "terms" ? colors.primary : colors.text },
            ]}
          >
            Terms of Service
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "privacy" && { borderBottomColor: colors.primary },
          ]}
          onPress={() => setActiveTab("privacy")}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === "privacy" ? colors.primary : colors.text },
            ]}
          >
            Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={[styles.legalText, { color: colors.text }]}>
          {activeTab === "terms" ? termsOfService : privacyPolicy}
        </Text>
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
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  legalText: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default LegalScreen;
