import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Colors, Dimensions } from "../constants";
import { useIsFocused } from "@react-navigation/native";
import { MainButton } from "../components";

const AuthenticationScreen = ({ navigation }: { navigation: any }) => {
  const textInput = useRef<TextInput | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>();
  const [focusInput, setFocusInput] = useState<boolean>(true);
  const [otpCode, setOtpCode] = useState<number | null>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setOtpCode(Math.floor(1000 + Math.random() * 9000));
    }
  }, [isFocused]);

  const onPressContinue = () => {
    if (phoneNumber && phoneNumber.length > 3) {
      navigation.navigate("InputOTP", {
        phoneNumber,
        otpCode,
      });
    }
  };

  const onChangeFocus = () => {
    setFocusInput(true);
  };

  const onChangeBlur = () => {
    setFocusInput(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
        style={styles.containerAvoidingView}
      >
        <Text style={styles.headerTitle}>
          <Text style={{ color: Colors.DEFAULT_GREEN }}>Menu</Text> Check
        </Text>
        <Text style={styles.textTitle}>
          Please fill in your telephone number
        </Text>
        <View style={[styles.containerInput]}>
          <View style={styles.openDialogView}>
            <Text style={{ fontFamily: "Poppins_400Regular" }}>{+31}</Text>
          </View>
          <TextInput
            ref={textInput}
            style={styles.phoneInputStyle}
            placeholder="640 041 733"
            keyboardType="numeric"
            onChangeText={(text: string) => {
              const text2 = `+31${text}`;
              setPhoneNumber(text2);
            }}
            secureTextEntry={false}
            onFocus={onChangeFocus}
            onBlur={onChangeBlur}
          />
        </View>
        <View style={styles.viewBottom}>
          <MainButton
            disabled={!phoneNumber || phoneNumber.length < 4}
            style={{ width: 150, height: 50 }}
            onPress={onPressContinue}
            title="Continue"
          />
          {/* <Pressable
            onPress={
              phoneNumber && phoneNumber.length > 3 ? onPressContinue : null
            }
          >
            <View
              style={[
                styles.btnContinue,
                {
                  backgroundColor:
                    phoneNumber && phoneNumber.length > 3
                      ? Colors.DEFAULT_GREEN
                      : Colors.DEFAULT_GREY,
                },
              ]}
            >
              <Text style={styles.textContinue}>Continue</Text>
            </View>
          </Pressable> */}
        </View>
      </KeyboardAvoidingView>
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
    padding: 10,
  },
  headerTitle: {
    fontSize: 35,
    fontFamily: "Poppins_700Bold",
    color: Colors.DEFAULT_BLACK,
    marginTop: 40,
  },
  textTitle: {
    marginBottom: 50,
    marginTop: 50,
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
  },
  containerInput: {
    flexDirection: "row",
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    borderBottomWidth: 2.5,
    width: Dimensions.setWidth(80),
    borderBottomColor: Colors.DEFAULT_GREEN,
  },
  openDialogView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  phoneInputStyle: {
    marginLeft: 5,
    flex: 1,
    height: 50,
    fontFamily: "Poppins_400Regular",
  },
  viewBottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 50,
    alignItems: "center",
    marginHorizontal: 20,
    width: "100%",
  },
  btnContinue: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#244DB7",
  },
  textContinue: {
    color: "#ffffff",
    alignItems: "center",
    fontFamily: "Poppins_700Bold",
  },
});

export default AuthenticationScreen;
