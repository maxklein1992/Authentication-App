import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Colors, Dimensions } from "../constants";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../actions/Actions";

import { db } from "../../firebase";
import { setDoc, doc, getDoc, deleteDoc } from "firebase/firestore";
import { deleteData } from "../general/util";
import { selectUser } from "../actions/Selectors";
import { MainButton } from "../components";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const token = user.token as string;

  const deleteAccount = (token: string) => {
    deleteData("userToken");
    const existingUser = doc(db, "Users", token);

    deleteDoc(existingUser)
      .then(() => {
        dispatch(deleteUser());
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <View style={styles.container}>
      <Text>Profile screen</Text>
      <View style={styles.buttonContainer}>
        <MainButton
          title="Delete my account"
          onPress={() => deleteAccount(token)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 40,
  },
  button: {
    backgroundColor: Colors.DEFAULT_GREEN,
    borderRadius: 8,
    height: Dimensions.setHeight(8),
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Colors.DEFAULT_WHITE,
    fontFamily: "Poppins_400Regular",
  },
});

export default ProfileScreen;
