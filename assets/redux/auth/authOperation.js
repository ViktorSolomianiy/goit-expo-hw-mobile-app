import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";

// export const authSignUpUser = (login, email, password) => {
//   createUserWithEmailAndPassword(auth, email, password)
//     .then(async (userCredential) => {
//       await updateProfile(auth.currentUser, { displayName: login });
//       const { uid, displayName, email } = await userCredential.user;
//       console.log(userCredential);

//       dispatch(
//         authSlice.actions.updateUserProfile({
//           userId: uid,
//           login: displayName,
//           email,
//         })
//       );
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
//         const { email } = userCredential.user;

//         dispatch(
//           authSlice.actions.authSignIn({
//             email,
//           })
//         );
//       })
//       .catch((error) => {
//         console.log("error.code:", error.code);
//         console.log("error.message:", error.message);
//       });
//   };

export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);

  dispatch(authSlice.actions.authSingOut());
};

export const authStateChangeUser = () => {
  let currentUser = undefined;
  onAuthStateChanged(auth, (user) => {
    console.log("i'm working cause i'm slut!!!!");
    if (user) {
      const { uid, displayName, email } = auth.currentUser;

      currentUser = { userId: uid, login: displayName, email };
    }
  });
  return currentUser;
};
