import React from "react";
import styled from "styled-components";

const SnackbarStyled = styled.div`
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f7ff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
  border-radius: 15px;
  opacity: 1;
`;

export default function Snackbar({ text }) {
  return <SnackbarStyled>{text}</SnackbarStyled>;
}
