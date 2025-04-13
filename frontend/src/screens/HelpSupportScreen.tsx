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

type HelpSupportScreenNavigationProp = NativeStackNavigationProp<
  ProfileStackParamList,
  "HelpSupport"
>;

const HelpSupportScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<HelpSupportScreenNavigationProp>();

  const handleEmailSupport = () => {
    Linking.openURL("mailto:support@atpapp.com");
  };

  const handleVisitWebsite = () => {
    Linking.openURL("https://atpapp.com/support");
  };

  const supportItems = [
    {
      title: "Frequently Asked Questions",
      icon: "help-circle-outline",
      description: "Find answers to common questions about using the app",
    },
    {
      title: "Contact Support",
      icon: "mail-outline",
      description: "Get in touch with our support team",
      onPress: handleEmailSupport,
    },
    {
      title: "Visit Support Website",
      icon: "globe-outline",
      description: "Access our online support resources",
      onPress: handleVisitWebsite,
    },
    {
      title: "Report a Bug",
      icon: "bug-outline",
      description: "Help us improve by reporting issues",
      onPress: handleEmailSupport,
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
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Help & Support
        </Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            How can we help you?
          </Text>

          <View style={styles.supportList}>
            {supportItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.supportItem, { backgroundColor: colors.card }]}
                onPress={item.onPress}
              >
                <Ionicons
                  name={item.icon as any}
                  size={24}
                  color={colors.primary}
                  style={styles.icon}
                />
                <View style={styles.itemContent}>
                  <Text style={[styles.itemTitle, { color: colors.text }]}>
                    {item.title}
                  </Text>
                  <Text
                    style={[
                      styles.itemDescription,
                      { color: colors.text + "80" },
                    ]}
                  >
                    {item.description}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.text + "40"}
                />
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.contactInfo}>
            <Text style={[styles.contactTitle, { color: colors.text }]}>
              Need more help?
            </Text>
            <Text style={[styles.contactText, { color: colors.text + "80" }]}>
              Our support team is available Monday through Friday, 9am to 5pm
              EST. We typically respond within 24 hours.
            </Text>
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
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    opacity: 0.8,
  },
  supportList: {
    marginBottom: 30,
  },
  supportItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  icon: {
    marginRight: 16,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
  },
  contactInfo: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default HelpSupportScreen;
