import styled from "styled-components";

const Header = styled.div`
  font-size: clamp(1.6rem, 7vw, 3rem);
  font-weight: bold;
  color: ${(props) => props.color};
  padding: 1rem;
`;

export default Header;
