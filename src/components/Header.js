import React from "react";
import styled from "styled-components";

function Header() {
  return (
    <div>
      <Container>
        <NavbarBrand>Class Notes</NavbarBrand>
        <NavbarLinks>
          <NavbarLink>Signin</NavbarLink>
        </NavbarLinks>
      </Container>
    </div>
  );
}

export default Header;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1% 3%;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.25);
  height: 3vh;
`;

const NavbarBrand = styled.span``;
const NavbarLinks = styled.div`
  display: flex;
`;
const NavbarLink = styled.div``;
