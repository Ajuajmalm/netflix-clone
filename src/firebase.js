import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYblVrgEYs-Fv-c6GKqV8judmuRN9qih8",
  authDomain: "netflix-clone-acd39.firebaseapp.com",
  projectId: "netflix-clone-acd39",
  storageBucket: "netflix-clone-acd39.appspot.com",
  messagingSenderId: "209517595869",
  appId: "1:209517595869:web:efa15efb07bb431cb11f34"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user; 
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

// Change the export statement
export { auth, db, login, signup, logout };
// If you need a default export, export the app
export default app;