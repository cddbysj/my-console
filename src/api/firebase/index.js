import firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCG7uQNMXfG_FiFb7XI7lSBgQDmz34oWFs',
  authDomain: 'my-console-e0d53.firebaseapp.com',
  databaseURL: 'https://my-console-e0d53.firebaseio.com',
  projectId: 'my-console-e0d53',
  storageBucket: 'my-console-e0d53.appspot.com',
  messagingSenderId: '1084312850586',
  appId: '1:1084312850586:web:69b29a32aead042c088f23',
  measurementId: 'G-R5ZL6XRK3L',
};

// Initialize Firebase
class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
    this.db = firebase.firestore();
  }

  // ** Helper ** //
  serverTimestamp = () => firebase.firestore.FieldValue.serverTimestamp();

  // ** Auth ** //
  createUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  signInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  signOut = () => this.auth.signOut();

  onAuthStateChanged = (next, fallback) =>
    this.auth.onAuthStateChanged(user => (user ? next(user) : fallback()));

  // ** Orders API ** //
  orders = () =>
    this.db
      .collection('orders')
      .orderBy('timestamp', 'desc')
      .limit(100);

  getOrders = async () =>
    await this.db
      .collection('orders')
      .orderBy('timestamp', 'desc')
      .limit(100)
      .get();

  createOrder = async order => await this.db.collection('orders').add(order);

  removeOrder = async id =>
    await this.db
      .collection('orders')
      .doc(id)
      .delete();

  toggleNameplatePrint = async (id, checked) =>
    await this.db
      .collection('orders')
      .doc(id)
      .update({
        nameplate: checked,
      });

  toggleCertificatePrint = async (id, checked) =>
    await this.db
      .collection('orders')
      .doc(id)
      .update({
        certificate: checked,
      });
}

export default new Firebase();
