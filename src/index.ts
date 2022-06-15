import { getToken, deleteToken, onMessage } from "firebase/messaging";
import { credentialSetup } from "./config/firebase";
import { firebaseConfig } from "./config/types";

const useNotification = (firebaseConfig: firebaseConfig, vapidKey: string) => {
  const { messaging } = credentialSetup(firebaseConfig);

  const suscribe = async () => {
    try {
      return await getToken(messaging, { vapidKey });
    } catch (err) {
      throw new Error(err)
    }
  };

  const unsuscribe = async () => {
    try {
      return await deleteToken(messaging);
    } catch (err) {
      throw new Error(err)
    }
  };

  const onMessageListener = () => onMessage(messaging, (payload) => payload);


  return {
    suscribe,
    unsuscribe,
    onMessageListener,
  };
};

export default useNotification;
