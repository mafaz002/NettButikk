import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
   margin: 0; 
  }
`;

const MainContainer = styled.div`
  width: 100%;
  height: 10rem;
  background-color: orange;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainTitle = styled.h1`
  margin: 0;
  color: black;
  font-size: 3rem;
  font-weight: bold;
  font-family: "Inter", sans-serif;
  user-select: none;
`;

const SubContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
`;

const FlexItem = styled.div`
  user-select: none;
  font-family: "Oswald", sans-serif;
  font-weight: bold;
  color: green;
  font-size: 2rem;
  &:hover {
    cursor: pointer;
  }
`;

const Header = () => {
  return (
    <MainContainer>
      <GlobalStyle />
      <div>
        <MainTitle>VERDIGE SMIL NETTBUTIKK</MainTitle>
        <SubContainer>
          <FlexItem>Home</FlexItem>
          <FlexItem>Shop</FlexItem>
          <FlexItem>About</FlexItem>
        </SubContainer>
      </div>
    </MainContainer>
  );
};

export default Header;
