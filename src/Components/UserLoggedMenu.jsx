import React, { useContext } from "react";
import { Context } from "../Context";
import { signOut } from "@firebase/auth";
import { auth } from "../Data/FirebaseConfig";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { removeFromUserWatchlist } from "../Data/FirebaseFunctions";

export default function UserLoggedMenu() {
  const { watchlistContext, userContext } = useContext(Context);
  const [watchlist, setWatchlistFromDB] = watchlistContext;
  const [user] = userContext;

  const removeHandler = async (investor) => {
    await removeFromUserWatchlist(user.uid, investor);
    setWatchlistFromDB();
  };

  const renderWatchlist = () => {
    return watchlist.length === 0
      ? ""
      : watchlist.map((investor) => {
          return (
            <div key={investor.id}>
              <Link to={`/investors/${investor.id}`}>{investor.name}</Link>
              <Button onClick={() => removeHandler(investor)}>remove</Button>
            </div>
          );
        });
  };

  return (
    <>
      <Button
        onClick={() => {
          signOut(auth);
        }}>
        Logout
      </Button>
      {renderWatchlist()}
    </>
  );
}
