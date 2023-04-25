import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import "firebase/storage";
import "firebase/firestore";

const KEY_URL =
  "https://goit-hw-react-native-3315c-default-rtdb.firebaseio.com";

const firebaseConfig = {
  apiKey: "AIzaSyBZDr7-EMuL8YGwomD0xv41n1m6FSR_ojA",
  authDomain: "goit-hw-react-native-3315c.firebaseapp.com",
  projectId: "goit-hw-react-native-3315c",
  storageBucket: "goit-hw-react-native-3315c.appspot.com",
  messagingSenderId: "538948657448",
  appId: "1:538948657448:web:7e003fd9e9db901229301d",
  measurementId: "G-Q9QDC5WYVG",
};

const app = initializeApp(firebaseConfig, KEY_URL);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);

// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getAuth } from "firebase/auth";
// import { initializeApp } from "firebase/app";
// import {
//   initializeAuth,
//   getReactNativePersistence,
// } from "firebase/auth/react-native";

// const firebaseConfig = {
//   apiKey: "AIzaSyBZDr7-EMuL8YGwomD0xv41n1m6FSR_ojA",
//   authDomain: "goit-hw-react-native-3315c.firebaseapp.com",
//   projectId: "goit-hw-react-native-3315c",
//   storageBucket: "goit-hw-react-native-3315c.appspot.com",
//   messagingSenderId: "538948657448",
//   appId: "1:538948657448:web:7e003fd9e9db901229301d",
//   measurementId: "G-Q9QDC5WYVG",
// };

// const app = initializeApp(firebaseConfig);
// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });
