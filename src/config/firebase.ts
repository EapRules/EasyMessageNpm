import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { firebaseConfig } from "./types";

export const credentialSetup = (firebaseConfig: firebaseConfig) => {
  const firebaseApp = initializeApp(firebaseConfig);
  const messaging = getMessaging(firebaseApp);
  return {messaging} ;
};

