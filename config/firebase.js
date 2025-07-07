import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC-9-NlcQtA3Uwf5dj0NxzvlAoEFyGv-ns",
    authDomain: "caremate-enigmacamp.firebaseapp.com",
    projectId: "caremate-enigmacamp",
    storageBucket: "caremate-enigmacamp.appspot.com",
    messagingSenderId: "690782120219",
    appId: "1:690782120219:web:33eefd450ffd7f5e5fcbbe",
    measurementId: "G-FZGESCMVK5",
};

const app = initializeApp(firebaseConfig);
const auths = getAuth(app);

export { auths };
