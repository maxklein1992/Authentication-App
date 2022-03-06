import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Dimensions } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { createUser, setToken } from "../actions/Actions";
import { db } from "../../firebase";
import { setDoc, doc, getDoc, deleteDoc } from "firebase/firestore";
import { deleteData, storeData } from "../general/util";
import { MainButton } from "../components";
import NavigationHeader from "../components/NavigationHeader";

const CompleteProfileScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const phoneNumber = route.params?.phoneNumber;

  const firstNameRef = useRef<TextInput | null>(null);
  const lastNameRef = useRef<TextInput | null>(null);
  const mailRef = useRef<TextInput | null>(null);

  const [firstName, setFirstName] = useState<string | null>("");
  const [lastName, setLastName] = useState<string | null>("");
  const [mail, setMail] = useState<string | null>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  // const user = { phoneNumber, firstName, lastName, mail };

  const finalizeOnboarding = () => {
    setLoading(true);
    deleteData("userToken");
    // Creating New Doc in Firebase
    const newUser = doc(db, "Users", phoneNumber);

    //Your Document goes here
    const userData = {
      "firstName": firstName,
      "lastName": lastName,
      "mail": mail,
      "token": phoneNumber,
    };
    setDoc(newUser, userData)
      .then(() => {
        //alert("New User Created!");
        storeData("userToken", phoneNumber);
        dispatch(setToken(phoneNumber));
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
      });
    dispatch(createUser(userData));
  };

  return isLoading ? (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      <NavigationHeader title="Complete Profile" navigation={navigation} />
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
        <MainButton
          disabled={!firstName || !lastName || !mail}
          title="Done"
          onPress={finalizeOnboarding}
        />
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
});

export default CompleteProfileScreen;
