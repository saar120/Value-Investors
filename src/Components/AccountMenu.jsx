import React, { useContext } from "react";
import { Context } from "../Context";
import styled from "styled-components";
import Fab from "@mui/material/Fab";
import SignForm from "./SignForm";
import UserLoggedMenu from "./UserLoggedMenu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const AccountMenuStyled = styled.div`
  z-index: 100;
  width: 300px;
  padding: 2rem;
  position: absolute;
  top: calc(50% - 180px - 1rem);
  left: calc(50% - 150px);
  border-radius: 15px;
  background-color: #f7f7ff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
  display: flex;
  flex-direction: column;
  .top {
    position: absolute;
    top: 5px;
    right: 5px;
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
      <div className="top">
        <Fab size="small" onClick={() => props.cancel()} color="primary">
          <CloseRoundedIcon />
        </Fab>
      </div>
      {user ? <UserLoggedMenu /> : <SignForm />}
    </AccountMenuStyled>
  );
}