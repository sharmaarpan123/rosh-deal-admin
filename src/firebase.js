// firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export { messaging, getToken, onMessage };

const requestNotificationPermission = async () => {
  const isAlreadyFirebaseSaved = localStorage.getItem("fireBaseToken");
  if (isAlreadyFirebaseSaved) {
    return;
  }
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "YOUR_WEB_PUSH_CERTIFICATE_KEY_PAIR",
      });

      if (token) {
        localStorage.setItem("fireBaseToken", token);

        console.log("Device token:", token);
        return token;
      } else {
        console.error("No registration token available.");
      }
    } else {
      console.error("Notification permission denied.");
    }
  } catch (error) {
    console.error("Error while requesting notification permission:", error);
  }
};

export default requestNotificationPermission;
