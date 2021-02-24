import firebase from 'firebase/app';
import 'firebase/database';

if (firebase.apps.length == 0){
    const firebaseConfig = {
        apiKey: process.env.FIREBASE_CONFIG_API_KEY,
        authDomain: process.env.FIREBASE_CONFIG_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_CONFIG_DATA_BASE_URL,
        projectId: process.env.FIREBASE_CONFIG_PROJECTID,
        storageBucket: process.env.FIREBASE_CONFIG_STORAGEBUCKET,
        messagingSenderId: process.env.FIREBASE_CONFIG_MESSAGINGSENDERID,
        appId: process.env.FIREBASE_CONFIG_APPID
    };
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.database();

export {
    firebase,
    db
};