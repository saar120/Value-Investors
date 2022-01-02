import { createContext, useState, useEffect } from "react";
import { auth } from "./Data/FirebaseConfig";
import { onAuthStateChanged } from "@firebase/auth";
import { getInvestors, getUserData } from "./Data/FirebaseFunctions";

export const Context = createContext();

export function ContextProvider(props) {
  const [Investors, setInvestors] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const setWatchlistFromDB = async () => {
    if (!user) {
      setWatchlist([]);
      return;
    }
    const data = await getUserData(user.uid);
    if (!data) return;
    setWatchlist(data.watchlist);
    console.log(data.watchlist);
  };

  useEffect(() => {
    const getData = async () => {
      const investors = await getInvestors();
      setInvestors(investors);
    };
    getData();
  }, []);

  useEffect(() => {
    setWatchlistFromDB();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Context.Provider
      value={{
        investorsContext: [Investors, setInvestors],
        userContext: [user, setUser],
        watchlistContext: [watchlist, setWatchlistFromDB],
      }}>
      {props.children}
    </Context.Provider>
  );
}
