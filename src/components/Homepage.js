import React from "react";
import styled from "styled-components";

export default function Homepage() {
  return (
    <Container>
      <Showcase>
        <LineOne>Welcome to NoteTaker</LineOne>
        <LineTwo>An app for class notes</LineTwo>
      </Showcase>
    </Container>
  );
}

const Container = styled.div``;
const Showcase = styled.div``;
const LineOne = styled.h1``;
const LineTwo = styled.p``;
