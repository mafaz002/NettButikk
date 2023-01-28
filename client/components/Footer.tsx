import styled from "styled-components";

const FooterContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100px;
  background-color: black;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <div style={{ color: "white" }}>Footer</div>
    </FooterContainer>
  );
};

export default Footer;
