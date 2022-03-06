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
import { Colors, Dimensions } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import { MainButton } from "../components";
import NavigationHeader from "../components/NavigationHeader";

const InputOTPScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const phoneNumber = route.params?.phoneNumber;
  const correctOTP = route.params?.otpCode;

  const pin1Ref = useRef<TextInput | null>(null);
  const pin2Ref = useRef<TextInput | null>(null);
  const pin3Ref = useRef<TextInput | null>(null);
  const pin4Ref = useRef<TextInput | null>(null);

  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [pin3, setPin3] = useState("");
  const [pin4, setPin4] = useState("");

  //const [otp, setOtp] = useState({ 1: "", 2: "", 3: "", 4: "" });

  const [isModalVisible, setIsModalVisible] = useState<Boolean>(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      pin1Ref.current?.clear();
      pin2Ref.current?.clear();
      pin3Ref.current?.clear();
      pin4Ref.current?.clear();
      setPin1("");
      setPin2("");
      setPin3("");
      setPin4("");
    }
  }, [isFocused]);

  const verifyOTP = () => {
    const otpCode = `${pin1}${pin2}${pin3}${pin4}`;
    if (otpCode == "1111") {
      navigation.navigate("CompleteProfile", {
        phoneNumber,
      });
    } else {
      setIsModalVisible(true);
    }
  };

  const tryAgain = () => {
    navigation.navigate("Authentication");
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavigationHeader title="OTP Verification" navigation={navigation} />
      <Text style={styles.textTile}>
        Input your OTP code sent by SMS at{" "}
        <Text style={styles.phoneNumberText}>{phoneNumber}</Text> now please.
      </Text>
      <View style={styles.otpContainer}>
        <View
          style={[
            styles.otpBox,
            {
              backgroundColor: Colors.DEFAULT_WHITE,
              borderWidth: 0.5,
            },
          ]}
        >
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={pin1Ref}
            onChangeText={(text: string) => {
              setPin1(text);
              text && pin2Ref.current?.focus();
            }}
          />
        </View>
        <View
          style={[
            styles.otpBox,
            {
              backgroundColor: pin1
                ? Colors.DEFAULT_WHITE
                : Colors.DEFAULT_GREY,
              borderWidth: pin1 ? 0.5 : 0,
            },
          ]}
        >
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={pin2Ref}
            onChangeText={(text: string) => {
              //setOtp({ ...otp, 2: text });
              setPin2(text);
              text ? pin3Ref.current?.focus() : pin1Ref.current?.focus();
            }}
          />
        </View>
        <View
          style={[
            styles.otpBox,
            {
              backgroundColor: pin2
                ? Colors.DEFAULT_WHITE
                : Colors.DEFAULT_GREY,
              borderWidth: pin2 ? 0.5 : 0,
            },
          ]}
        >
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={pin3Ref}
            onChangeText={(text) => {
              setPin3(text);
              text ? pin4Ref.current?.focus() : pin2Ref.current?.focus();
            }}
          />
        </View>
        <View
          style={[
            styles.otpBox,
            {
              backgroundColor: pin3
                ? Colors.DEFAULT_WHITE
                : Colors.DEFAULT_GREY,
              borderWidth: pin3 ? 0.5 : 0,
            },
          ]}
        >
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={pin4Ref}
            onChangeText={(text) => {
              setPin4(text);
              !text && pin3Ref.current?.focus();
            }}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <MainButton title="Verify" disabled={!pin4} onPress={verifyOTP} />
      </View>
      <Modal transparent={true} visible={isModalVisible}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View
            style={{
              width: Dimensions.setWidth(90),
              height: Dimensions.setHeight(40),
              backgroundColor: Colors.DEFAULT_WHITE,
              borderRadius: 10,
              paddingVertical: 60,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 9,
              },
              shadowOpacity: 0.5,
              shadowRadius: 12.35,
              elevation: 19,
            }}
          >
            <Text style={styles.headerModal}>OTP Code was incorrect</Text>
            <View style={[styles.buttonContainer, { marginTop: 40 }]}>
              <MainButton title="Try again" onPress={tryAgain}></MainButton>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerModal: {
    fontFamily: "Poppins_400Regular",
    fontSize: 20,
  },
  textTile: {
    fontSize: 16,
    marginHorizontal: 20,
    marginTop: 50,
    marginBottom: 50,
    fontFamily: "Poppins_400Regular",
  },
  phoneNumberText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: Colors.DEFAULT_GREEN,
  },
  containerInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  otpContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  otpBox: {
    borderRadius: 5,
    width: 60,
    borderColor: Colors.DEFAULT_GREEN,
  },
  otpText: {
    fontSize: 25,
    color: Colors.DEFAULT_BLACK,
    padding: 0,
    textAlign: "center",
    paddingHorizontal: 18,
    paddingVertical: 10,
    fontFamily: "Poppins_400Regular",
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 40,
  },
});

export default InputOTPScreen;
