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

import * as SecureStore from "expo-secure-store";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";

const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  //const hasToken = useSelector((state) => state.isLogged);

  const [userToken, setUserToken] = useState("");

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync("userToken");
        setUserToken(userToken);
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.

      //dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {!userToken ? (
            <>
              <Stack.Screen
                component={AuthenticationScreen}
                name={"Authentication"}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                component={SplashScreen}
                name={"SplashScreen"}
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
      tabBarOptions={{
        labelPosition: "below-icon",
        style: {
          backgroundColor: "black",
        },
      }}
      screenOptions={{ headerShown: false }}
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
      <HomeStack.Screen
        name="Home2"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

export default Navigation;
