import { useState, useEffect } from "react";
import firebase from "../components/firebase";

export default function useAuth() {
  const [auth, setAuth] = useState(null);
  useEffect(() => {
    firebase.onAuthStateChanged(
      user => setAuth(user),
      () => setAuth(null)
    );
  }, []);

  return auth;
}
