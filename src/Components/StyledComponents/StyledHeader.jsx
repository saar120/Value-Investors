import styled from "styled-components";

const Header = styled.div`
  font-size: clamp(1.6rem, 5vw, 2.2rem);
  font-weight: bold;
  color: ${(props) => props.color};
  padding: 1rem;
`;

export default Header;
