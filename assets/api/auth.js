import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/config";

export const uploadAvatarToServer = async (uid, avatar) => {
  const response = await fetch(avatar);
  const file = await response.blob();
  const fileRef = await ref(storage, `userAvatar/${uid}`);

  await uploadBytes(fileRef, file).catch((err) => console.log("err:", err));
};

export const removeAvatarFromServer = async (uid) => {
  const desertRef = ref(storage, `userAvatar/${uid}`);
  await deleteObject(desertRef);
};
