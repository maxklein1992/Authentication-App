import React, { FC } from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { Colors, Dimensions } from "../constants";
import { Ionicons } from "@expo/vector-icons";

interface NavigationHeaderProps {
  title: string;
  navigation: any;
}

const NavigationHeader: FC<NavigationHeaderProps> = ({ title, navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <Ionicons
        name="chevron-back-outline"
        size={30}
        onPress={() => navigation.goBack()}
        style={{ position: "absolute", left: 20, top: 9 }}
      />
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: Dimensions.setWidth(80),
  },
  headerTitle: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
  },
});

export default NavigationHeader;
