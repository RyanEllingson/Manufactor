import React, { useState } from "react";
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBM_7S35EzYIZ-BkR6V05lex7hYVP_J0ic",
    authDomain: "manufactor-81435.firebaseapp.com",
    databaseURL: "https://manufactor-81435.firebaseio.com",
    projectId: "manufactor-81435",
    storageBucket: "manufactor-81435.appspot.com",
    messagingSenderId: "175442106889",
    appId: "1:175442106889:web:2ca2a2a7558801854bf6d8",
    measurementId: "G-1YW1DV8CZG"
}

firebase.initializeApp(firebaseConfig);

export const FirebaseContext = React.createContext("firebase");

const provider = new firebase.auth.GoogleAuthProvider();

const db = firebase.firestore();

export function Firebase({ children }) {
    const [user, setUser] = useState(null);

    const googleSignIn = function() {
        firebase.auth().signInWithPopup(provider).then(function(result) {
            console.log(result.user);
            setUser(result.user);
        }).catch(function(error) {
            console.error(error);
        });
    }

    const signOut = function() {
        firebase.auth().signOut().then(function() {
            setUser(null);
        }).catch(function(error) {
            console.error(error);
        });
    }

    return (
        <FirebaseContext.Provider
            value={{ db, user, googleSignIn, signOut }}>
            {children}
        </FirebaseContext.Provider>
    );
};