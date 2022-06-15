import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

export const credentialSetup = (firebaseConfig: any) => {
  const firebaseApp = initializeApp(firebaseConfig);
  const messaging = getMessaging(firebaseApp);
  return {messaging} ;
};

