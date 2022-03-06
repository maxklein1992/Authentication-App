import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Alert, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { selectUser } from "../actions/Selectors";

const HomeScreen = () => {
  const user = useSelector(selectUser);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Text>
        Hello {user.firstName} {user.lastName}
      </Text>
    </View>
  );
};

export default HomeScreen;
