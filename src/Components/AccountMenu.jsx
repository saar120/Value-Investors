import React, { useContext } from "react";
import { Context } from "../Context";
import styled from "styled-components";
import Button from "@mui/material/Button";
import SignForm from "./SignForm";
import UserLoggedMenu from "./UserLoggedMenu";

const AccountMenuStyled = styled.div`
  z-index: 100;
  width: 300px;
  height: 370px;
  position: absolute;
  top: calc(50% - 185px);
  left: calc(50% - 150px);
  border-radius: 15px;
  background-color: #f7f7ff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
  display: flex;
  flex-direction: column;
  .top {
    width: 100%;
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
      <div className="top">
        <Button onClick={() => props.cancel()} sx={{ mr: 2 }}>
          X
        </Button>
      </div>
      {user ? <UserLoggedMenu /> : <SignForm />}
    </AccountMenuStyled>
  );
}
