import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen } from "../Screens/Main/Home";
import { LoginScreen } from "../Screens/LoginScreen";
import { RegistrationScreen } from "../Screens/RegistrationScreen";

import { authStateChangeUser } from "../redux/auth/authOperation";
import { authSlice } from "../redux/auth/authReducer";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase/config";

const AuthStack = createStackNavigator();

export const Main = () => {
  const userData = useSelector((state) => state.auth);
  const { stateChange, userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("this fucking dispatch is triggerrring MEEEEEEEEE");
    const user = authStateChangeUser();
    if (user) {
      dispatch(authSlice.actions.updateUserProfile(user));
    }
  }, []);

  useEffect(() => {
    if (userId)
      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
  }, [userId]);

  useEffect(() => {
    console.log("userData 1: ", userData);
    if (userId) {
      console.log("before getting url");
      console.log("userData 2: ", userData);
      getDownloadURL(ref(storage, `userAvatar/${userId}`))
        .then((url) => {
          console.log("url: ", url);
          dispatch(authSlice.actions.updateUserAvatar(url));
        })
        .catch((err) => console.log(err));
    }
  }, [stateChange, userId]);

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
