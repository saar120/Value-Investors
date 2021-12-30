import { createContext } from "react";

export const investorsContext = createContext();

export function InvestorsProvider(props) {
  return <investorsContext.Provider value={"hello world"}>{props.children}</investorsContext.Provider>;
}
