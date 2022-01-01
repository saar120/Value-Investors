import styled from "styled-components";

const ImageHolder = styled.div`
  height: clamp(300px, ${(props) => props.size}vw, 400px);
  width: clamp(300px, ${(props) => props.size}vw, 400px);
  background: url(${(props) => props.image}) center center / cover;
  border-radius: ${(props) => (props.circle ? "50%" : "10px")};
`;

export default ImageHolder;
