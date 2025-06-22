import { initializeAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import type { App } from "vue";
import { VueFire } from "vuefire";

const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
});

const useFirebase = (app: App<Element>) => {
  if (!import.meta.env.PROD || import.meta.env.VITE_BUILD_ELECTRON) {
    return;
  }

  initializeAnalytics(firebaseApp);
  app.use(VueFire, { firebaseApp });
};

export default useFirebase;
