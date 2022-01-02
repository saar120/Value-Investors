import { createContext, useState, useEffect } from "react";
import { auth } from "./Data/FirebaseConfig";
import { onAuthStateChanged } from "@firebase/auth";
import { getInvestors } from "./Data/FirebaseFunctions";

export const Context = createContext();

export function ContextProvider(props) {
  const [Investors, setInvestors] = useState([]);
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  useEffect(() => {
    const getData = async () => {
      const investors = await getInvestors();
      setInvestors(investors);
    };
    getData();
  }, []);

  return (
    <Context.Provider value={{ investorsContext: [Investors, setInvestors], userContext: [user, setUser] }}>
      {props.children}
    </Context.Provider>
  );
}
