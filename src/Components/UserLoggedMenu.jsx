import React, { useContext } from "react";
import { Context } from "../Context/Context";
import { signOut } from "@firebase/auth";
import { auth } from "../Data/FirebaseConfig";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { removeFromUserWatchlist } from "../Data/FirebaseFunctions";
import styled from "styled-components";

const StyledLoggedMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .name {
    span {
      font-weight: bold;
    }
  }
`;

export default function UserLoggedMenu({ closePage }) {
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
    <StyledLoggedMenu>
      <div className="name">
        Hi, <span>{user.displayName}</span>
      </div>
      <Button
        onClick={() => {
          signOut(auth);
          closePage();
        }}>
        Logout
      </Button>
      <div>{watchlist.length === 0 ? "Your Watchlist is empty" : "Watchlist"}</div>
      {renderWatchlist()}
    </StyledLoggedMenu>
  );
}
