import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyCa0RMRjb0lcnN24M1xkZ0YGNxi0A6MURw",
    authDomain: "botaniq-40acb.firebaseapp.com",
    projectId: "botaniq-40acb",
    storageBucket: "botaniq-40acb.appspot.com",
    messagingSenderId: "822466677402",
    appId: "1:822466677402:web:7d411c4842ea5a1b6b6d23",
    measurementId: "G-KZSFPVWZ3P"
  };
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  export { app, auth };