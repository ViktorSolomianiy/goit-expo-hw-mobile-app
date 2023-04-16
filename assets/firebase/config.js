import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBZDr7-EMuL8YGwomD0xv41n1m6FSR_ojA",
  authDomain: "goit-hw-react-native-3315c.firebaseapp.com",
  projectId: "goit-hw-react-native-3315c",
  storageBucket: "goit-hw-react-native-3315c.appspot.com",
  messagingSenderId: "538948657448",
  appId: "1:538948657448:web:7e003fd9e9db901229301d",
  measurementId: "G-Q9QDC5WYVG",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyBZDr7-EMuL8YGwomD0xv41n1m6FSR_ojA",
//   authDomain: "goit-hw-react-native-3315c.firebaseapp.com",
//   projectId: "goit-hw-react-native-3315c",
//   storageBucket: "goit-hw-react-native-3315c.appspot.com",
//   messagingSenderId: "538948657448",
//   appId: "1:538948657448:web:7e003fd9e9db901229301d",
//   measurementId: "G-Q9QDC5WYVG",
// };

// export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
