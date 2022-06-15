import { getToken, deleteToken, onMessage } from "firebase/messaging";
import { credentialSetup } from "./config/firebase";

type FirebaseData = {
  firebaseConfig: {},
  vapidKey: string;
};

const useNotification = ({ firebaseConfig, vapidKey }: FirebaseData) => {
  const { messaging } = credentialSetup(firebaseConfig);

  const suscribe = async () => {
    try {
      return await getToken(messaging, { vapidKey });
    } catch (error) {
      return console.log("An error occurred while retrieving token. ", error);
    }
  };

  const unsuscribe = async () => {
    try {
      return await deleteToken(messaging);
    } catch (error) {
      return console.log("An error occurred while deleting the token. ", error);
    }
  };

  const onMessageListener = async () => {
    try {
      return await onMessage(messaging, (payload) => payload);
    } catch (error) {
      return console.log("An error occurred while retriving message. ", error);
    }
  };

  return {
    suscribe,
    unsuscribe,
    onMessageListener,
  };
};

export default useNotification;
