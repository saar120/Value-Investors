import { collection, getDocs } from "firebase/firestore";
import db from "./FirebaseConfig";

const dataCollection = collection(db, "investors");

// export default class Firebase {
const getInvestors = async () => {
  const data = await getDocs(dataCollection);
  const investors = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return investors;
};
// }

export default getInvestors;
