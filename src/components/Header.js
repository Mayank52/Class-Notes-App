import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { auth, provider } from "../config/firebase";
import { useStateValue } from "../Context/StateProvider";
import { Link } from "react-router-dom";

function Header() {
  const [{ user }, dispatch] = useStateValue();

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch({
        type: "SET_USER",
        payload: null,
      });
      localStorage.removeItem("user");
    });
  };

  return (
    <div>
      <Container>
        <Link to="/">
          <NavbarBrand>NoteTaker</NavbarBrand>
        </Link>

        <NavbarLinks>
          <Link to="contactus">
            <NavbarLink>Contact Us</NavbarLink>
          </Link>
          <Link to="notes">
            <NavbarLink>Notes</NavbarLink>
          </Link>
          {user ? (
            <>
              <NavbarLink>
                <UserContainer>Hello, {user.name}</UserContainer>
              </NavbarLink>
              <NavbarLink>
                <SignoutButton onClick={signOut}>Sign out</SignoutButton>
              </NavbarLink>
            </>
          ) : (
            <NavbarLink>
              <Link to="/signin">
                <SigninButton>Sign In</SigninButton>
              </Link>
            </NavbarLink>
          )}
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

const NavbarBrand = styled.span`
  width: 50%;
`;
const NavbarLinks = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-evenly;
  align-items: center;
`;
const NavbarLink = styled.div``;

const SigninContainer = styled.div`
  display: flex;
  align-item: center;
`;
const UserContainer = styled.div``;
const SigninButton = styled.div``;
const SignoutButton = styled.div``;
const LoggedInContainer = styled.div`
  display: flex;
`;
const NotLoggedInContainer = styled.div`
  display: flex;
`;
