import {initializeApp} from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js';
import {getAuth,signInAnonymously,GoogleAuthProvider,signInWithPopup,signOut,onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js';
import {getFirestore,collection,doc,onSnapshot,runTransaction,serverTimestamp} from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js';
import {firebaseConfig} from './firebase-config.js';
export const app=initializeApp(firebaseConfig),auth=getAuth(app),db=getFirestore(app);
export const ADMIN='jennyshih0711@gmail.com';
export {collection,doc,onSnapshot,runTransaction,serverTimestamp,GoogleAuthProvider,signInWithPopup,signOut,onAuthStateChanged};
export async function visitor(){await auth.authStateReady();if(!auth.currentUser)await signInAnonymously(auth);return auth.currentUser;}
export function notify(message){const el=document.getElementById('cloudStatus');el.textContent=message;el.classList.remove('hidden');}
// One-time removal of the retired demo cache. Never touches live cloud records.
localStorage.removeItem('openeo_workshop_v1');sessionStorage.removeItem('workshop_current');
