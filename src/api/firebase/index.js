import firebase from "firebase/app";

// These imports load individual services into the firebase namespace.
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
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

  // 获取订单列表
  orders = () =>
    this.db
      .collection("orders")
      .orderBy("date.orderAt", "desc")
      .limit(100);

  // 新建订单
  createOrder = async order => await this.db.collection("orders").add(order);

  // 删除订单
  removeOrder = async id => {
    await this.db
      .collection("orders")
      .doc(id)
      .delete();
    // 同时也要删除掉对应的合格证数据
    await this.removeCertificates(id);
  };

  // 铭牌打印切换
  toggleNameplatePrint = async (id, checked) =>
    await this.db
      .collection("orders")
      .doc(id)
      .update({
        nameplate: checked
      });

  // 合格证打印切换
  toggleCertificatePrint = async (id, checked) =>
    await this.db
      .collection("orders")
      .doc(id)
      .update({
        certificate: checked
      });

  // 获取最近 9 个订单的合格证
  certificates = () =>
    this.db
      .collection("certificates")
      .orderBy("arrivalAt", "desc")
      .limit(9);

  // 新建当前订单的产品合格证
  createCertificates = async (id, certificateInfo) =>
    await this.db
      .collection("certificates")
      .doc(id)
      .set(certificateInfo);

  // 移除当前订单的产品合格证
  removeCertificates = async id =>
    await this.db
      .collection("certificates")
      .doc(id)
      .delete();
  // 完成某个订单的产品合格证打印
  finishCertificatesPrint = async (id, checked) =>
    await this.db
      .collection("certificates")
      .doc(id)
      .update({ printDone: checked });
}

export default new Firebase();
