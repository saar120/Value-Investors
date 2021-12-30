import { collection, getDocs, addDoc } from "firebase/firestore";
import db from "./FirebaseConfig";

const dataCollection = collection(db, "investors");

const getInvestors = async () => {
  const data = await getDocs(dataCollection);
  const investors = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return investors;
};

const insertInvestor = (newData) => {
  addDoc(dataCollection, newData);
};

export { getInvestors, insertInvestor };
