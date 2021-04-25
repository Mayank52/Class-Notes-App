import "./App.css";
import Header from "./components/Header";
import Content from "./components/Content";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
      <Router>
        <Container>
          <Header />
          <Content />
        </Container>
      </Router>
  );
}

export default App;

const Container = styled.div``;
