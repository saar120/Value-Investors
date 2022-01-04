import styled from "styled-components";

const ImageHolder = styled.div`
  height: clamp(250px, ${(props) => props.size}vw, 500px);
  width: clamp(250px, ${(props) => props.size}vw, 500px);
  background: url(${(props) => props.image}) center center / cover;
  border-radius: ${(props) => (props.circle ? "50%" : "10px")};
  border: ${(props) => (props.circle ? "3px solid #f7f7ff" : "")};
  box-shadow: ${(props) => (props.circle ? "rgba(0, 0, 0, 0.35) 0px 5px 10px" : "")};
`;

export default ImageHolder;
