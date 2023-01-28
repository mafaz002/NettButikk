import { useRouter } from "next/router";
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

const FlexItem = styled.div<{ active?: boolean }>`
  user-select: none;
  font-family: "Oswald", sans-serif;
  font-weight: bold;
  color: green;
  font-size: 2rem;
  border-bottom: ${(props) => (props.active ? "2px solid red" : "none")};
  &:hover {
    cursor: pointer;
  }
`;

const Header = () => {
  const router = useRouter();

  const handleClick = (path: string) => {
    router.push(path);
  };

  const getActiveTab = () => router.asPath.split("/")[1];

  return (
    <MainContainer>
      <GlobalStyle />
      <div>
        <MainTitle>VERDIGE SMIL NETTBUTIKK</MainTitle>
        <SubContainer>
          <FlexItem
            active={getActiveTab() === ""}
            onClick={() => handleClick("/")}
          >
            Home
          </FlexItem>
          <FlexItem
            active={getActiveTab() === "products"}
            onClick={() => handleClick("/products")}
          >
            Shop
          </FlexItem>
          <FlexItem
            active={getActiveTab() === "about"}
            onClick={() => handleClick("/about")}
          >
            About
          </FlexItem>
        </SubContainer>
      </div>
    </MainContainer>
  );
};

export default Header;
