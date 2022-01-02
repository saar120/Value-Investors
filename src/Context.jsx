import { createContext, useState, useEffect } from "react";
import { getInvestors } from "./Data/FirebaseFunctions";

export const Context = createContext();

export function ContextProvider(props) {
  const [Investors, setInvestors] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getData = async () => {
      const investors = await getInvestors();
      console.log(investors);
      setInvestors(investors);
    };

    getData();
  }, []);

  return <Context.Provider value={[Investors, setInvestors, user, setUser]}>{props.children}</Context.Provider>;
}
