import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import ClassList from "./ClassList";
import ClassNotes from "./ClassNotes";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import EditNote from "./EditNote";

function Content() {
  const [notes, setNotes] = useState([]);
  const [classes, setClasses] = useState([]);
  const [activeClassId, setActiveClassId] = useState("");
  const [activeNote, setActiveNote] = useState();
  //try setting to useRef
  const [saveButtonClicked, setSaveButtonClicked] = useState(false);

  useEffect(() => {
    async function fetchData() {
      let classesObj = await axios.get("http://localhost:3000/api/class");
      let classesList = classesObj.data.data;
      setClasses(classesList);
      changeNotes(classesList[0]._id);
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Active Note set to: ", activeNote);
  }, [activeNote]);

  useEffect(() => {
    if (saveButtonClicked) activeNote._id ? updateNote() : createNote();
    return () => {
      setSaveButtonClicked(false);
    };
  }, [saveButtonClicked]);

  useEffect(() => {
    console.log("active class set to", activeClassId);
    let selectedClass = classes.filter((clss) => {
      return clss._id == activeClassId;
    });

    if (selectedClass[0]) {
      let classNotes = selectedClass[0].classnotes;
      setNotes(classNotes);
      // setActiveNote(classNotes[0]);
    }
  }, [activeClassId]);

  //sets the active classId which triggers the useEffect of activeClassId which updates the notes
  const changeNotes = (classId) => {
    setActiveClassId(classId);
  };

  const createNewClass = async (classname) => {
    if (!classname) return;
    const classObj = await axios.post("http://localhost:3000/api/class", {
      classname,
    });
    console.log(classObj.data.data);

    setClasses([...classes, classObj.data.data]);
  };

  const deleteClass = async () => {
    const deletedClassObj = await axios.delete(
      `http://localhost:3000/api/class/${activeClassId}`
    );
    let updatedClasses = classes.filter(
      (classobj) => classobj._id != activeClassId
    );
    setClasses(updatedClasses);
    changeNotes(classes[0]._id);
  };

  const createNote = async () => {
    try {
      let note = {
        notename: activeNote.notename,
        notecontent: activeNote.notecontent,
      };

      console.log("Creating note:", note, activeNote);

      const newNoteObj = await axios.post(
        `http://localhost:3000/api/notes/${activeClassId}`,
        { note }
      );
      console.log(newNoteObj);

      setNotes(newNoteObj.data.data.classnotes);
    } catch (error) {
      console.log(error);
    }
  };

  const updateNote = async () => {
    try {
      console.log(activeClassId, activeNote._id);
      let updateobj = {
        notename: activeNote.notename,
        notecontent: activeNote.notecontent,
      };

      console.log(updateobj);
      const updatedNoteObj = await axios.patch(
        `http://localhost:3000/api/notes/${activeClassId}/${activeNote._id}`,
        { updateobj }
      );
      console.log(updatedNoteObj);

      setNotes(updatedNoteObj.data.data.classnotes);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (noteId) => {
    console.log(activeClassId, noteId);
    let deletedNoteObj = await axios.delete(
      `http://localhost:3000/api/notes/${activeClassId}/${noteId}`
    );
    console.log(deletedNoteObj);

    let updatedNotes = notes.filter((note) => note._id != noteId);
    setNotes(updatedNotes);
  };

  const renameClass = async (classId, newClassname) => {
    let updatedClassObj = await axios.patch(
      `http://localhost:3000/api/class/${classId}`,
      { classname: newClassname }
    );

    console.log(updatedClassObj);

    let updatedClasses = classes.map((classObj) => {
      if (classObj._id == classId)
        return { ...classObj, classname: newClassname };
      else return classObj;
    });

    setClasses(updatedClasses);
  };
  
  return (
    <div>
      <Container>
        <ClassList
          classes={classes}
          createNewClass={createNewClass}
          renameClass={renameClass}
          changeNotes={(id) => {
            changeNotes(id);
          }}
        />
        <Switch>
          <Route path="/newNote">
            <EditNote
              note={activeNote}
              createNote={createNote}
              setActiveNote={setActiveNote}
              updateNote={updateNote}
              setSaveButtonClicked={setSaveButtonClicked}
            />
          </Route>
          <Route path="/">
            <ClassNotes
              notes={notes}
              deleteNote={deleteNote}
              deleteClass={deleteClass}
              setActiveNote={setActiveNote}
            />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default Content;

const Container = styled.div`
  display: flex;
  height: 90vh;
`;
