import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { auth, provider } from "../config/firebase";
import { useStateValue } from "../Context/StateProvider";

export default function Register() {
  const [{ user }, dispatch] = useStateValue();

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

  return (
    <Container>
      <LeftContainer>
        <SigninImg />
      </LeftContainer>
      <RightContainer>
        <FormHeader>Sign UP</FormHeader>
        <FormBody>
          <RegisterButton onClick={register}>
            Sign up with Google
          </RegisterButton>
          <Link to="signin">
            <SigninButton>Sign in</SigninButton>
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
