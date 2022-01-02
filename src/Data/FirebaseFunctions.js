import { db } from "./FirebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

const dataCollection = collection(db, "investors");

const getInvestors = async () => {
  const data = await getDocs(dataCollection);
  const investors = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return investors;
};

const getInvestor = async (id) => {
  const docRef = doc(db, "investors", id);
  const data = await getDoc(docRef);
  return { ...data.data(), id };
};

const insertInvestor = (newData) => {
  addDoc(dataCollection, newData);
};

const insertUser = async (newData) => {
  await setDoc(doc(db, "users", newData.id), newData);
};

const getUserData = async (userId) => {
  const userRef = doc(db, "users", userId);
  const data = await getDoc(userRef);
  return data.data();
};

const addToUserWatchlist = async (userId, investor) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, { watchlist: arrayUnion({ name: investor.name, id: investor.id }) });
};

const removeFromUserWatchlist = async (userId, investor) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, { watchlist: arrayRemove({ name: investor.name, id: investor.id }) });
};

export {
  getInvestors,
  insertInvestor,
  getInvestor,
  insertUser,
  getUserData,
  addToUserWatchlist,
  removeFromUserWatchlist,
};
