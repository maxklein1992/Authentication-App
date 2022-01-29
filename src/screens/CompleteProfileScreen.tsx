import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  FlatList,
  Button,
  Modal,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Dimensions } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, login, logout } from "../actions/Actions";

const CompleteProfileScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const firstNameRef = useRef<TextInput | null>(null);
  const lastNameRef = useRef<TextInput | null>(null);
  const mailRef = useRef<TextInput | null>(null);

  const [firstName, setFirstName] = useState<string | null>("");
  const [lastName, setLastName] = useState<string | null>("");
  const [mail, setMail] = useState<string | null>("");

  const dispatch = useDispatch();

  const goHome = () => {
    dispatch(login());
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", left: 20, top: 9 }}
        />
        <Text style={styles.headerTitle}>Complete Profile</Text>
      </View>
      <Text style={styles.textTile}>
        Please enter your personal details to complete your profile.
      </Text>
      <View style={styles.nameContainer}>
        <View style={[styles.nameBox, { borderWidth: firstName ? 2 : 0 }]}>
          <Text style={styles.inputHeader}>First Name</Text>
          <TextInput
            keyboardType="default"
            ref={firstNameRef}
            onChangeText={(text) => {
              setFirstName(text);
            }}
            style={styles.inputText}
          />
        </View>
        <View style={[styles.nameBox, { borderWidth: lastName ? 2 : 0 }]}>
          <Text style={styles.inputHeader}>Last Name</Text>
          <TextInput
            keyboardType="default"
            ref={lastNameRef}
            onChangeText={(text) => {
              setLastName(text);
            }}
            style={styles.inputText}
          />
        </View>
      </View>
      <View style={styles.mailContainer}>
        <View style={[styles.mailBox, { borderWidth: mail ? 2 : 0 }]}>
          <Text style={styles.inputHeader}>E-mail</Text>
          <TextInput
            keyboardType="default"
            ref={mailRef}
            onChangeText={(text) => {
              setMail(text);
            }}
            style={styles.inputText}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[
            styles.Button,
            {
              backgroundColor:
                !firstName || !lastName || !mail
                  ? Colors.DEFAULT_GREY
                  : Colors.DEFAULT_GREEN,
            },
          ]}
          onPress={!firstName || !lastName || !mail ? () => "" : () => goHome()}
        >
          <Text style={styles.ButtonText}>Done</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerAvoidingView: {
    flex: 1,
    alignItems: "center",
  },
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
  textTile: {
    fontSize: 16,
    marginHorizontal: 20,
    marginTop: 50,
    marginBottom: 30,
    fontFamily: "Poppins_400Regular",
  },
  nameContainer: {
    flexDirection: "row",
    width: "100%",
    height: 55,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  nameBox: {
    backgroundColor: Colors.DEFAULT_WHITE,
    width: "45%",
    paddingHorizontal: 10,
    paddingTop: 22,
    borderColor: Colors.DEFAULT_GREEN,
    borderRadius: 5,
  },
  inputHeader: {
    position: "absolute",
    top: 5,
    left: 10,
    color: Colors.DEFAULT_GREY,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  inputText: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  mailContainer: {
    flexDirection: "row",
    width: "100%",
    height: 55,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 30,
  },
  mailBox: {
    backgroundColor: Colors.DEFAULT_WHITE,
    width: "100%",
    paddingHorizontal: 10,
    paddingTop: 22,
    borderColor: Colors.DEFAULT_GREEN,
    borderRadius: 5,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 40,
  },
  Button: {
    backgroundColor: Colors.DEFAULT_GREEN,
    borderRadius: 8,
    height: Dimensions.setHeight(8),
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  ButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Colors.DEFAULT_WHITE,
    fontFamily: "Poppins_400Regular",
  },
});

export default CompleteProfileScreen;
