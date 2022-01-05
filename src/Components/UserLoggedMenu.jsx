import React, { useContext } from "react";
import { Context } from "../Context/Context";
import { signOut } from "@firebase/auth";
import { auth } from "../Data/FirebaseConfig";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { removeFromUserWatchlist } from "../Data/FirebaseFunctions";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";

const StyledLoggedMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  .name {
    span {
      font-weight: bold;
    }
  }
`;

const WatchlistStyled = styled.ul`
  display: flex;
  list-style: none;
  padding: 0.3rem;
  flex-direction: column;
  gap: 0.2rem;
  width: 100%;
  li {
    display: flex;
    justify-content: space-between;
  }
  .link {
    text-decoration: none;
    color: black;
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
            <li key={investor.id} className="">
              <Link className="link" to={`/investors/${investor.id}`}>
                {investor.name}
              </Link>
              <Button onClick={() => removeHandler(investor)}>
                <CloseIcon />
              </Button>
            </li>
          );
        });
  };

  return (
    <StyledLoggedMenu>
      <div className="name">
        Hi, <span>{user.displayName}</span>
      </div>
      <div>{watchlist.length === 0 ? "Your Watchlist is empty" : "Watchlist"}</div>
      <WatchlistStyled>{renderWatchlist()}</WatchlistStyled>
      <Button
        onClick={() => {
          signOut(auth);
          closePage();
        }}>
        Logout
      </Button>
    </StyledLoggedMenu>
  );
}
