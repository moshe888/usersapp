 
  import { getStorage } from 'firebase/storage';

 import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
 
const firebaseConfig = {
 

    apiKey: 'AIzaSyBHMwEZ70l5OVj2fi8uskqHwD2KGv70RTM ',
    authDomain: 'userapp-eb316.firebaseapp.com',
    projectId: 'userapp-eb316',
    storageBucket: 'userapp-eb316.appspot.com',
    messagingSenderId: '563735319607',
    appId: '1:563735319607:web:443dfb2ef574527fea1bb2',
    measurementId: 'G-ZPNHL08T96'

 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {db};
export const storage = getStorage(app);

