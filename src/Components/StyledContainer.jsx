import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3rem;
  h3 {
    color: ${(props) => props.color};
  }
`;

export default Container;
