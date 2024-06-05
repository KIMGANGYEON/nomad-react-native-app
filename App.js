import React, { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Ionicons } from "@expo/vector-icons";
import { useAssets } from "expo-asset";
import { Text, View, useColorScheme } from "react-native";
import { useFonts } from "expo-font";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";

import Root from "./navigation/Root";
import Tabs from "./navigation/Tabs";
import Stack from "./navigation/Stack";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts(Ionicons.font);
  const [assets] = useAssets([require("./back.jpeg")]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && assets) await SplashScreen.hideAsync();
  }, [fontsLoaded, assets]);

  const isDark = useColorScheme() === "dark";
  if (!fontsLoaded || !assets) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </View>
  );
}

{
  /* theme={isDark ? DarkTheme : DefaultTheme} */
}
