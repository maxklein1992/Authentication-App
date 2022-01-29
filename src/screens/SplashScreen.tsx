import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, StatusBar, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors, Images } from "../constants";
import { Display } from "../utils";

const SplashScreen = ({ navigation }: { navigation: any }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Authentication");
    }, 2500);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.DEFAULT_GREEN}
        translucent
      />
      <Image source={Images.BURGER} resizeMode="contain" style={styles.image} />
      <Text style={[styles.titleText, { fontFamily: "Poppins_600SemiBold" }]}>
        Menu Check
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.DEFAULT_GREEN,
  },
  titleText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 40,
    marginTop: 30,
  },
  image: {
    color: "white",
    height: Display.setHeight(30),
    width: Display.setWidth(60),
  },
});

export default SplashScreen;
