import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "../firebase";
import axios from "axios";

const provider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(
    auth,
    provider
  );

  const firebaseUser = result.user;

  const idToken = await firebaseUser.getIdToken();

  const response = await axios.post(
    "http://localhost:5000/api/auth/google",
    {
      idToken,
    }
  );

  localStorage.setItem(
    "token",
    response.data.token
  );

  localStorage.setItem(
    "user",
    JSON.stringify(response.data.user)
  );

  return response.data;
};