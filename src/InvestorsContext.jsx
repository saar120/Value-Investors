import { useState, createContext } from "react";

export const investorsContext = createContext();

export function InvestorsProvider(props) {
  const [investors, setInvestors] = useState(["hello"]);

  return <investorsContext.Provider value={"hello world"}>{props.children}</investorsContext.Provider>;
}
