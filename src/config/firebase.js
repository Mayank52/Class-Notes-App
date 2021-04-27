import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCv1jsyss3ZeAdyhO_mrNlODOKiqIMp8Bw",
  authDomain: "class-notes-bce28.firebaseapp.com",
  projectId: "class-notes-bce28",
  storageBucket: "class-notes-bce28.appspot.com",
  messagingSenderId: "108699875764",
  appId: "1:108699875764:web:82002ffaf241da5a309ae1",
});

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
