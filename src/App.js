import "./App.css";
import Header from "./components/Header";
import Content from "./components/Content";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { useStateValue } from "./Context/StateProvider";
import Signin from "./components/Signin";
import Register from "./components/Register";
import Homepage from "./components/Homepage";
import EditNote from "./components/EditNote";
import Contactus from "./components/Contactus";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <Router>
      <Container>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Homepage />
          </Route>
          <Route path="/notes">{user ? <Content /> : <Signin />}</Route>
          <Route path="/signin">{user ? <Content /> : <Signin />}</Route>
          <Route path="/register">{user ? <Content /> : <Register />}</Route>
          <Route path="/editNote">{user ? <EditNote /> : <Register />}</Route>
          <Route path="/contactus"><Contactus/></Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;

const Container = styled.div``;
