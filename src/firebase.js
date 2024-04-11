import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAhfxRxQnEZEyR4LOW2BCGMB5SwVW2T4cw",
  authDomain: "todo-app-8ac47.firebaseapp.com",
  projectId: "todo-app-8ac47",
  storageBucket: "todo-app-8ac47.appspot.com",
  messagingSenderId: "847409584317",
  appId: "1:847409584317:web:480313b1c207f34ff93fd4",
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export { db };
