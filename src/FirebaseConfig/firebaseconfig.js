// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAp2TCraLqAjPAKQlep1kAY6q7Wi6qlweQ",
  authDomain: "reactmychat.firebaseapp.com",
  projectId: "reactmychat",
  storageBucket: "reactmychat.appspot.com",
  messagingSenderId: "924466711885",
  appId: "1:924466711885:web:4652ff313a75ffebc17b04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig