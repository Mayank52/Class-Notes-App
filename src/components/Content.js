import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import ClassList from "./ClassList";
import ClassNotes from "./ClassNotes";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import EditNote from "./EditNote";

function Content({user}) {
  const [notes, setNotes] = useState([]);
  const [classes, setClasses] = useState([]);
  const [activeClassId, setActiveClassId] = useState("");
  const [activeNote, setActiveNote] = useState();
  //try setting to useRef
  const [saveButtonClicked, setSaveButtonClicked] = useState(false);

  useEffect(() => {
    async function fetchData() {
      let classesObj = await axios.get(`http://localhost:3000/api/class/${user.uid}`);
      let classesList = classesObj.data.data;
      setClasses(classesList);
      if (classesList.length > 0) changeNotes(classesList[0]._id);
    }
    if(user) fetchData();
    else{
      setClasses([])
      setNotes([])
      setActiveClassId("")
      setActiveNote(null)
    }
  }, [user]);

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
      console.log("notes set");
    }
  }, [activeClassId]);

  //sets the active classId which triggers the useEffect of activeClassId which updates the notes
  const changeNotes = (classId) => {
    console.log("change notes called");
    setActiveClassId(classId);
  };

  const createNewClass = async (classname) => {
    if (!classname) return;

    console.log("Creating Class")

    const classObj = await axios.post(`http://localhost:3000/api/class/${user.uid}`, {
      classname,
    });
    console.log(classObj.data.data);

    setClasses([...classes, classObj.data.data]);
  };

  const deleteClass = async () => {
    console.log("Deleting Class")

    const deletedClassObj = await axios.delete(
      `http://localhost:3000/api/class/${user.uid}/${activeClassId}`
    );

    console.log(deletedClassObj);

    let updatedClasses = classes.filter(
      (classobj) => classobj._id != activeClassId
    );
    setClasses(updatedClasses);
    if (updatedClasses.length > 0) changeNotes(updatedClasses[0]._id);
    else setNotes([]);
  };

  const renameClass = async (classId, newClassname) => {
    console.log("Renaming Class")

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

  const updateClass = (updateClassObj) => {
    console.log("Updating Class")

    let updatedClasses = classes.map((classObj) => {
      if (classObj._id == updateClassObj._id) return updateClassObj;
      else return classObj;
    });

    setClasses(updatedClasses);
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
      updateClass(newNoteObj.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateNote = async () => {
    try {
      console.log("Updating Note")

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
      updateClass(updatedNoteObj.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (noteId) => {
    console.log("Deleting Note")

    console.log(activeClassId, noteId);
    let deletedNoteObj = await axios.delete(
      `http://localhost:3000/api/notes/${activeClassId}/${noteId}`
    );
    console.log(deletedNoteObj);

    let updatedNotes = notes.filter((note) => note._id != noteId);
    setNotes(updatedNotes);
    updateClass(deletedNoteObj.data.data);
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
