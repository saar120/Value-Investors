import React from "react";
import styled from "styled-components";

const SnackbarStyled = styled.div`
  z-index: 100;
  position: fixed;
  width: clamp(100px, 90%, 400px);
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e9e9f7;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
  border-radius: 15px;
  opacity: 1;
  font-size: 0.8rem;
  font-weight: bold;
`;

export default function Snackbar({ text }) {
  return <SnackbarStyled>{text}</SnackbarStyled>;
}
