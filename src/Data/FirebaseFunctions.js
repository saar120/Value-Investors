import { db, auth } from "./FirebaseConfig";
import { collection, getDocs, addDoc, getDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "@firebase/auth";

const dataCollection = collection(db, "investors");

const getInvestors = async () => {
  const data = await getDocs(dataCollection);
  const investors = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return investors;
};

const getInvestor = async (id) => {
  const docRef = doc(db, "investors", id);
  const data = await getDoc(docRef);
  return data.data();
};

const insertInvestor = (newData) => {
  addDoc(dataCollection, newData);
};

const register = async () => {
  try {
    const user = await createUserWithEmailAndPassword(auth);
  } catch (err) {
    console.error(err.messege);
  }
};

const signIn = async () => {};

const signOut = async () => {};

export { getInvestors, insertInvestor, getInvestor };
