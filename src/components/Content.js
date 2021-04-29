import React, {useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import ClassList from "./ClassList";
import ClassNotes from "./ClassNotes";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import EditNote from "./EditNote";
import { useStateValue } from "../Context/StateProvider";

function Content() {
  const [{ user, classes, activeClassId }, dispatch] = useStateValue();

  useEffect(() => {
    async function fetchData() {
      let classesObj = await axios.get(`http://localhost:3000/api/class/${user.uid}`);
      let classesList = classesObj.data.data;
      if (classesList.length > 0) {
        dispatch({
          type: "SET_CLASSES",
          payload: classesList,
        });
        dispatch({
          type: "SET_ACTIVE_CLASS",
          payload: classesList[0]._id,
        });
      }
    }
    if(user) fetchData();
    else{
      //if no user is signed in then, reset the state
      dispatch({
        type: "SET_CLASSES",
        payload: [],
      });
      dispatch({
        type: "SET_ACTIVE_CLASS",
        payload: "",
      });
      dispatch({
        type: "SET_NOTES",
        payload: [],
      });
      dispatch({
        type: "CHANGE_ACTIVE_NOTE",
        payload: null,
      });
    }
  }, [user]);

  useEffect(() => {
    console.log("active class set to", activeClassId);
    let selectedClass = classes.filter((clss) => {
      return clss._id == activeClassId;
    });

    if (selectedClass[0]) {
      let classNotes = selectedClass[0].classnotes;
      dispatch({
        type: "SET_NOTES",
        payload: classNotes,
      });
    }
  }, [activeClassId]);

  return (
    <Container>
      <ClassList />
      <Switch>
        <Route path="/editNote">
          <EditNote />
        </Route>
        {/* <Route path="/viewNotes"> */}
          <ClassNotes />
        {/* </Route> */}
      </Switch>
    </Container>
  );
}

export default Content;

const Container = styled.div`
  display: flex;
  height: 90vh;
`;
