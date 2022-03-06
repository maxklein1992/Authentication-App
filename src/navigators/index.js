import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { Entypo, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AuthenticationScreen from "../screens/AuthenticationScreen";
import InputOTPScreen from "../screens/InputOTPScreen";
import SplashScreen from "../screens/SplashScreen";
import CompleteProfileScreen from "../screens/CompleteProfileScreen";
import {
  View,
  ActivityIndicator,
  SegmentedControlIOSComponent,
} from "react-native";
import { LogBox } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { setUser, setToken } from "../actions/Actions";
import { getData } from "../general/util";

const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  LogBox.ignoreLogs(["Setting a timer"]);
  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  ]);
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    getAuthState();
  }, []);

  const getAuthState = async () => {
    setLoading(true);
    try {
      getData("userToken").then((localToken) => {
        dispatch(setToken(localToken));
      });
    } catch (error) {
      alert(error);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  });

  const fetchUserData = async () => {
    // Reading Doc in Firebase
    const user = doc(db, "Users", token);
    getDoc(user)
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch(setUser(snapshot.data()));
          if (token !== null) setLoading(false);
        } else {
          alert("No User Found");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const update = (value, merge) => {
    // Reading Doc in Firebase
    const myDoc = doc(db, "Users", token);
    setDoc(myDoc, value, { merge: merge })
      .then(() => {})
      .catch((error) => {
        alert(error.message);
      });
  };

  return isLoading ? (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  ) : (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {!token ? (
            <>
              <Stack.Screen
                component={SplashScreen}
                name={"SplashScreen"}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                component={AuthenticationScreen}
                name={"Authentication"}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                component={InputOTPScreen}
                name={"InputOTP"}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                component={CompleteProfileScreen}
                name={"CompleteProfile"}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                component={Home}
                name={"Home"}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        labelPosition: "below-icon",
        headerShown: false,
        style: {
          backgroundColor: "black",
        },
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="home"
              size={24}
              color={focused ? "#2F3140" : "#B8B6C2"}
            />
          ),
          title: "",
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="search1"
              size={24}
              color={focused ? "#2F3140" : "#B8B6C2"}
            />
          ),
          title: "",
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="account-outline"
              size={30}
              color={focused ? "#2F3140" : "#B8B6C2"}
            />
          ),
          title: "",
        }}
      />
    </Tab.Navigator>
  );
};

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

export default Navigation;
