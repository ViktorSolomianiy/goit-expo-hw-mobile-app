import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { app, analytics } from "../../firebase/config";
import { authSlice } from "./authReducer";

// export const authSignUpUser = ({ login, email, password }) => {
//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       console.log(userCredential);
//       console.log(email, password);

//       const user = userCredential.user;
//       console.log(user);
//     })
//     .catch((error) => {
//       console.log(error.code);
//       console.log(error.message);
//     });
// };

// export const authSignInUser =
//   ({ email, password }) =>
//   async (dispatch, getState) => {
//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         const user = userCredential.user;
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//       });
//   };

export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid, displayName, email } = auth.currentUser;

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          login: displayName,
          email,
        })
      );

      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
    }
  });
};
