import React, { useContext } from "react";
import { Context } from "../Context/Context";
import styled from "styled-components";
import Fab from "@mui/material/Fab";
import SignForm from "./SignForm";
import UserLoggedMenu from "./UserLoggedMenu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const widthBreakPoint = 700;

const AccountMenuStyled = styled.div`
  color: black;
  z-index: 100;
  width: 300px;
  padding: 1rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
  background-color: #f7f7ff;
  box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.76);
  display: flex;
  flex-direction: column;

  .top {
    display: flex;
    justify-content: flex-end;
  }
  .pointer {
    cursor: pointer;
  }
`;

export default function AccountMenu(props) {
  const { userContext } = useContext(Context);
  const [user] = userContext;

  return (
    <AccountMenuStyled>
      {window.innerWidth > widthBreakPoint ? (
        ""
      ) : (
        <div className="top">
          <Fab size="small" onClick={props.cancel} color="primary">
            <CloseRoundedIcon />
          </Fab>
        </div>
      )}
      {user ? <UserLoggedMenu closePage={props.cancel} /> : <SignForm closePage={props.cancel} />}
    </AccountMenuStyled>
  );
}
