// firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBWXI9A_rFIrG1IcYTGH9PlhGg93WNYrLA",
  authDomain: "roash-deals.firebaseapp.com",
  projectId: "roash-deals",
  storageBucket: "roash-deals.firebasestorage.app",
  messagingSenderId: "445125567251",
  appId: "1:445125567251:web:62102c6b8fce6ea3bb70e6",
  measurementId: "G-ZMNN74WPC7"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export { messaging, getToken, onMessage };

const requestNotificationPermission = async () => {
  const isAlreadyFirebaseSaved = localStorage.getItem("fireBaseToken");
  if (isAlreadyFirebaseSaved) {
    return isAlreadyFirebaseSaved;
  }
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BDXtW1Tu4PSTYDsLptOuEm027F8qQ7KAOQL7zxL7oEKMiWUM2PlI565lzGIKjG3veRGd4YHQI96MKn8ah6op3S8",
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
