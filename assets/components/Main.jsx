import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen } from "../Screens/Main/Home";
import { LoginScreen } from "../Screens/LoginScreen";
import { RegistrationScreen } from "../Screens/RegistrationScreen";

import { onAuthStateChanged } from "firebase/auth";
import { authStateChangeUser } from "../redux/auth/authOperation";
import { auth } from "../firebase/config";
import { authSlice } from "../redux/auth/authReducer";

const AuthStack = createStackNavigator();

export const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setIsAuth(false);
  //       const { uid, displayName, email } = auth.currentUser;

  //       dispatch(
  //         authSlice.actions.updateUserProfile({
  //           userId: uid,
  //           login: displayName,
  //           email,
  //         })
  //       );
  //     }
  //   });

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
