import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { auth, provider } from "../config/firebase";
import { useStateValue } from "../Context/StateProvider";

function Header() {
  const [{ user }, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        let user = result.user;
        console.log(user);
        let newUser = {
          name: user.displayName,
          photo: user.photoURL,
          email: user.email,
          uid: user.uid,
        };
        checkIfUserExists(newUser);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const checkIfUserExists = async (userObj) => {
    const dbUserObj = await axios.get(
      `http://localhost:3000/api/user/${userObj.uid}`
    );
    console.log(dbUserObj.data.data);

    if (dbUserObj.data.data) {
      localStorage.setItem("user", JSON.stringify(userObj));

      dispatch({
        type: "SET_USER",
        payload: userObj,
      });
    } else console.log("Register first!!");
  };

  const register = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        let user = result.user;
        console.log(user);
        let newUser = {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
        };
        createUser(newUser);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const createUser = async (newUser) => {
    try {
      console.log("Creating new user");
      console.log(newUser);
      const userObj = await axios.post(
        "http://localhost:3000/api/user",
        newUser
      );
      console.log(userObj);

      localStorage.setItem("user", JSON.stringify(newUser));
      dispatch({
        type: "SET_USER",
        payload: newUser,
      });
    } catch (error) {
      console.log(error);
    }
  };

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
        <NavbarBrand>Class Notes</NavbarBrand>
        <NavbarLinks>
          <SigninContainer>
            {user ? (
              <LoggedInContainer>
                <UserContainer>Hello, {user.name}</UserContainer>
                <SignoutButton onClick={signOut}>Sign out</SignoutButton>
              </LoggedInContainer>
            ) : (
              <NotLoggedInContainer>
                <SigninButton onClick={signIn}>Sign In With Google</SigninButton>
                <RegisterButton onClick={register}>Register</RegisterButton>
              </NotLoggedInContainer>
            )}
          </SigninContainer>
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

const SigninContainer = styled.div`
  display: flex;
  align-item: center;
`;
const UserContainer = styled.div``;
const SigninButton = styled.button``;
const RegisterButton = styled.button``;
const SignoutButton = styled.button``;
const LoggedInContainer = styled.div`
  display: flex;
`;
const NotLoggedInContainer = styled.div`
  display: flex;
`;
