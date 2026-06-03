import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAUBuqDuV8xNfRTSLLB5qRlengFyhzBFL0",
  authDomain: "betasource-broadcast.firebaseapp.com",
  projectId: "betasource-broadcast",
  storageBucket: "betasource-broadcast.firebasestorage.app",
  messagingSenderId: "12449902499",
  appId: "1:12449902499:web:c2c8bd22fdc4f91cfc7416",
  measurementId: "G-CN0NNXGPY1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
export const messaging = getMessaging(app);

// Function to request notification permission and get device token
export const requestForToken = async () => {
  const vapidKey = "BAjk2czxYcmVqGl_csvea95wCI-sFjNcobaJoRGhUnLm_7X375JUBIQzpi2MmMyNsgK-o-FWTI8cD8jgu3UcUTk";
  try {
    const currentToken = await getToken(messaging, { vapidKey });
    if (currentToken) {
      console.log('FCM Device Token:', currentToken);
      // In a real app, you send this token to your backend database
      // so the backend knows exactly which device to send push notifications to.
      return currentToken;
    } else {
      console.log('No registration token available. Request permission to generate one.');
      return null;
    }
  } catch (err) {
    console.log('An error occurred while retrieving token. ', err);
    return null;
  }
};

// Function to listen for incoming messages when the app is OPEN in the browser
export const setupForegroundListener = (callback) => {
  return onMessage(messaging, (payload) => {
    console.log('Foreground Message Received:', payload);
    callback(payload);
  });
};

export default app;
