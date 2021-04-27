import "./App.css";
import {useState} from 'react'
import Header from "./components/Header";
import Content from "./components/Content";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <Router>
      <Container>
        <Header user={user} setUser={setUser}/>
        <Content user={user}/>
      </Container>
    </Router>
  );
}

export default App;

const Container = styled.div``;
