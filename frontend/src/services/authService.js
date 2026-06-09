import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "../firebase";
import axios from "axios";

const API =
  import.meta.env.VITE_SERVER_URL;

const provider = new GoogleAuthProvider();

export const loginWithGoogle = async (role) => {
  const result = await signInWithPopup(
    auth,
    provider
  );

  const firebaseUser = result.user;

  const idToken = await firebaseUser.getIdToken();

  const response = await axios.post(
    `${API}/api/auth/google`,
    {
      idToken,
      role,
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