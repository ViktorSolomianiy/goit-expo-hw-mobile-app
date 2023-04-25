import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen } from "../Screens/Main/Home";
import { LoginScreen } from "../Screens/LoginScreen";
import { RegistrationScreen } from "../Screens/RegistrationScreen";

import { authStateChangeUser } from "../redux/auth/authOperation";

const AuthStack = createStackNavigator();

export const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        {stateChange ? (
          <AuthStack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <AuthStack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <AuthStack.Screen
              name="Register"
              component={RegistrationScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};
