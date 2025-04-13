import * as ImagePicker from "expo-image-picker";

import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import { API_CONFIG } from "../config/api";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../types/navigation";
import { User } from "../types/models";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  ProfileStackParamList,
  "ProfileMain"
>;

export const ProfileScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const { signOut } = useAuth();
  const { user, setUser } = useUser();
  const [notifications, setNotifications] = useState(true);
  const [profileImage, setProfileImage] = useState<string | null>(
    user?.profileImage
  );
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: signOut,
        },
      ],
      { cancelable: true }
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              // Send DELETE request to backend to delete the account
              const response = await fetch(
                `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.DELETE_PROFILE}`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user?.token}`,
                  },
                }
              );

              if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to delete account");
              }

              // Sign out the user after successful account deletion
              await signOut();
              Alert.alert("Success", "Your account has been deleted.");
            } catch (error) {
              Alert.alert(
                "Error",
                (error as Error).message ||
                  "Failed to delete account. Please try again."
              );
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please grant camera roll permissions to change your profile picture."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled && result.assets[0].uri) {
        // Update local state immediately for better UX
        setProfileImage(result.assets[0].uri);

        // Update user context
        const updatedUser = { ...user, profileImage: result.assets[0].uri };
        setUser(updatedUser);

        // Send update to backend
        try {
          const response = await fetch(
            `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PROFILE}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user?.token}`,
              },
              body: JSON.stringify({
                profileImage: result.assets[0].uri,
              }),
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              errorData.error || "Failed to update profile image"
            );
          }

          // Profile image updated successfully
          console.log("Profile image updated successfully");
        } catch (error) {
          // If backend update fails, revert the local state
          setProfileImage(user?.profileImage || null);
          setUser(user);
          Alert.alert(
            "Error",
            (error as Error).message ||
              "Failed to update profile image. Please try again."
          );
        }
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image. Please try again.");
    }
  };

  const handleEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  const handleChangePassword = () => {
    navigation.navigate("ChangePassword");
  };

  const renderSectionHeader = (title: string) => (
    <Text style={[styles.sectionHeader, { color: theme.colors.text }]}>
      {title}
    </Text>
  );

  const renderSettingItem = (
    icon: string,
    title: string,
    value?: string,
    onPress?: () => void,
    isSwitch?: boolean,
    switchValue?: boolean,
    onSwitchChange?: (value: boolean) => void
  ) => (
    <TouchableOpacity
      style={[styles.settingItem, { borderBottomColor: theme.colors.border }]}
      onPress={onPress}
      disabled={isSwitch}
    >
      <View style={styles.settingItemLeft}>
        <Ionicons
          name={icon as any}
          size={22}
          color={theme.colors.text}
          style={styles.settingIcon}
        />
        <Text style={[styles.settingItemText, { color: theme.colors.text }]}>
          {title}
        </Text>
      </View>
      {value && (
        <Text
          style={[styles.settingItemValue, { color: theme.colors.secondary }]}
        >
          {value}
        </Text>
      )}
      {isSwitch && (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{
            false: theme.colors.border,
            true: theme.colors.notification,
          }}
          thumbColor={
            switchValue ? theme.colors.primary : theme.colors.background
          }
        />
      )}
      {!isSwitch && !value && (
        <Ionicons
          name="chevron-forward"
          size={20}
          color={theme.colors.secondary}
        />
      )}
    </TouchableOpacity>
  );

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
            fontSize: 24,
            fontWeight: "bold",
            padding: 16,
          },
        ]}
      >
        Profile
      </Text>

      <ScrollView style={styles.scrollView}>
        {/* Profile Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={pickImage}
            style={styles.profileImageContainer}
          >
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <Ionicons name="person-circle" size={80} color="#4CAF50" />
            )}
            <View style={styles.editIconContainer}>
              <Ionicons name="camera" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
          <Text style={[styles.name, { color: theme.colors.text }]}>
            {user?.name || "User"}
          </Text>
          <Text style={[styles.username, { color: theme.colors.secondary }]}>
            @{user?.username || "username"}
          </Text>
        </View>

        {/* Account Section */}
        {renderSectionHeader("Account")}
        <View
          style={[
            styles.section,
            {
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.border,
            },
          ]}
        >
          {renderSettingItem(
            "person-outline",
            "Edit Profile",
            undefined,
            handleEditProfile
          )}
          {renderSettingItem(
            "key-outline",
            "Change Password",
            undefined,
            handleChangePassword
          )}
        </View>

        {/* Preferences Section */}
        {renderSectionHeader("Preferences")}
        <View
          style={[
            styles.section,
            {
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.border,
            },
          ]}
        >
          {renderSettingItem(
            "notifications-outline",
            "Notifications",
            undefined,
            undefined,
            true,
            notifications,
            setNotifications
          )}
          {renderSettingItem(
            "moon-outline",
            "Dark Mode",
            undefined,
            undefined,
            true,
            theme.isDark,
            toggleTheme
          )}
          {renderSettingItem("language-outline", "Language", user?.language)}
        </View>

        {/* Support Section */}
        {renderSectionHeader("Support")}
        <View
          style={[
            styles.section,
            {
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.border,
            },
          ]}
        >
          {renderSettingItem(
            "help-circle-outline",
            "Help & Support",
            undefined,
            () => navigation.navigate("HelpSupport")
          )}
          {renderSettingItem(
            "information-circle-outline",
            "About",
            undefined,
            () => navigation.navigate("About")
          )}
          {renderSettingItem(
            "document-text-outline",
            "Terms & Privacy",
            undefined,
            () => navigation.navigate("Legal")
          )}
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.card }]}
          onPress={handleSignOut}
        >
          <Text style={[styles.buttonText, { color: theme.colors.error }]}>
            Sign Out
          </Text>
        </TouchableOpacity>

        {/* Delete Account Button */}
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: theme.colors.error, marginTop: 8 },
          ]}
          onPress={handleDeleteAccount}
        >
          <Text style={[styles.buttonText, { color: "#FFFFFF" }]}>
            Delete Account
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    position: "relative",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#4CAF50",
    borderRadius: 15,
    padding: 8,
    borderWidth: 2,
    borderColor: "#fff",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    marginBottom: 8,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  settingItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    marginRight: 12,
  },
  settingItemText: {
    fontSize: 16,
  },
  settingItemValue: {
    fontSize: 14,
  },
  button: {
    margin: 16,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
