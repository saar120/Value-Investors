import { createContext, useState, useEffect } from "react";
import { getInvestors } from "./Data/FirebaseFunctions";

export const investorsContext = createContext();

export function InvestorsProvider(props) {
  const [Investors, setInvestors] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const investors = await getInvestors();
      console.log(investors);
      setInvestors(investors);
    };

    getData();
  }, []);

  return <investorsContext.Provider value={[Investors, setInvestors]}>{props.children}</investorsContext.Provider>;
}
