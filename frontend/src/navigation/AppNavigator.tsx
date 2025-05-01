import {
  AuthStackParamList,
  MainTabParamList,
  ProfileStackParamList,
  RootStackParamList,
} from "../types/navigation";

// Import screens
import AboutScreen from "../screens/AboutScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import HelpSupportScreen from "../screens/HelpSupportScreen";
import { Ionicons } from "@expo/vector-icons";
import LegalScreen from "../screens/LegalScreen";
import LoginScreen from "../screens/LoginScreen";
import { PicksScreen } from "../screens/PicksScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import React, { useState } from "react";
import SignupScreen from "../screens/SignupScreen";
import StandingsScreen from "../screens/StandingsScreen";
import { TournamentsScreen } from "../screens/TournamentsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { View, TouchableOpacity, StyleSheet } from "react-native";

// Create navigators
const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

// Custom Tab Bar Component
const CustomTabBar = ({ state, navigation }: any) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState(state.index);

  const getIconName = (routeName: string, isFocused: boolean) => {
    switch (routeName) {
      case "Tournaments":
        return isFocused ? "trophy" : "trophy-outline";
      case "Profile":
        return isFocused ? "person" : "person-outline";
      case "Picks":
        return isFocused ? "list" : "list-outline";
      case "Standings":
        return isFocused ? "stats-chart" : "stats-chart-outline";
      default:
        return "help";
    }
  };

  return (
    <View
      style={[
        styles.tabBar,
        {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border,
        },
      ]}
    >
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;
        const iconName = getIconName(route.name, isFocused);

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabButton}
            onPress={() => {
              setActiveTab(index);
              navigation.navigate(route.name);
            }}
          >
            <Ionicons
              name={iconName as any}
              size={24}
              color={isFocused ? theme.colors.primary : theme.colors.secondary}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// Main Stack Navigator
const MainNavigator = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="Tournaments" component={TournamentsScreen} />
      <Stack.Screen name="Picks" component={PicksScreen} />
      <Stack.Screen name="Standings" component={StandingsScreen} />
      <Stack.Screen name="Profile" component={ProfileNavigator} />
    </Stack.Navigator>
  );
};

// Profile Stack Navigator
const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
      <ProfileStack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
      />
      <ProfileStack.Screen name="HelpSupport" component={HelpSupportScreen} />
      <ProfileStack.Screen name="About" component={AboutScreen} />
      <ProfileStack.Screen name="Legal" component={LegalScreen} />
    </ProfileStack.Navigator>
  );
};

// Auth Navigator
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
};

// Root Navigator
export const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Main" component={MainNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    height: 60,
    borderTopWidth: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
