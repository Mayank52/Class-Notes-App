import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { auth, provider } from "../config/firebase";
import { useStateValue } from "../Context/StateProvider";

export default function Signin() {
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

  return (
    <Container>
      <LeftContainer>
        <SigninImg />
      </LeftContainer>
      <RightContainer>
        <FormHeader>Sign in</FormHeader>
        <FormBody>
          <SigninButton onClick={signIn}>Sign in with Google</SigninButton>
          <Link to="/register">
            <RegisterButton>Sign up</RegisterButton>
          </Link>
        </FormBody>
      </RightContainer>
    </Container>
  );
}

const Container = styled.div``;
const LeftContainer = styled.div``;
const RightContainer = styled.div``;
const SigninImg = styled.img``;
const FormHeader = styled.h1``;
const FormBody = styled.div``;
const SigninButton = styled.button``;
const RegisterButton = styled.button``;
