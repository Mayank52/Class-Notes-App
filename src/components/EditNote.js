import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import axios from "axios";
import { useStateValue } from "../Context/StateProvider";
import TextEditor from "./TextEditor";

function EditNote() {
  const [{ activeClassId, activeNote }, dispatch] = useStateValue();
  const [notename, setNoteName] = useState("");
  const [notecontent, setNoteContent] = useState("");
  const [saveButtonClicked, setSaveButtonClicked] = useState(false);
  const history = useHistory();
  let note = activeNote._id ? activeNote : null;

  useEffect(() => {
    setNoteName(note ? note.notename : "Enter Note Name");
    setNoteContent(note ? note.notecontent : "Enter Note Content");
  }, []);

  useEffect(() => {
    if (saveButtonClicked) {
      activeNote._id
        ? updateNote(activeNote, activeClassId, dispatch)
        : createNote(activeNote, activeClassId, dispatch);

      history.push("/");
    }
    return () => {
      setSaveButtonClicked(false);
    };
  }, [saveButtonClicked]);

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

      dispatch({
        type: "SET_NOTES",
        payload: newNoteObj.data.data.classnotes,
      });

      dispatch({
        type: "UPDATE_CLASS",
        payload: newNoteObj.data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateNote = async () => {
    try {
      console.log("Updating Note");

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

      dispatch({
        type: "UPDATE_NOTE",
        payload: updatedNoteObj.data.data.classnotes,
      });

      dispatch({
        type: "UPDATE_CLASS",
        payload: updatedNoteObj.data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const saveNote = (e) => {
    e.preventDefault();

    let currentNote = {
      ...note,
      notename,
      notecontent,
    };

    console.log("Current Note:", currentNote);

    setSaveButtonClicked(true);
    dispatch({
      type: "CHANGE_ACTIVE_NOTE",
      payload: currentNote,
    });
  };

  return (
    <Container>
      <NewNoteHeader>
        <HeaderBlock>
          <BackIconContainer>
            <Link to="/">
              <ArrowBackIcon />
            </Link>
          </BackIconContainer>
        </HeaderBlock>
        <HeaderBlock>
          <NoteName
            value={notename}
            onChange={(e) => {
              setNoteName(e.target.value);
            }}
          />
          <NoteDate>{note ? note.createdon : "Creation Date"}</NoteDate>
        </HeaderBlock>
        <HeaderBlock>
          <SaveButton onClick={saveNote}>Save</SaveButton>
        </HeaderBlock>
      </NewNoteHeader>      
      <TextEditor
        notecontent={note ? note.notecontent : []}
        setNoteContent={setNoteContent}
      />
    </Container>
  );
}

export default EditNote;

const Container = styled.div`
  width: 82vw;
  padding: 3%;
`;

const NewNoteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid grey;
`;
const NoteName = styled.input`
  border: 1px solid lightgrey;
  border-radius: 4px;
  :focus {
    outline: none;
  }
`;
const NoteDate = styled.div``;
const HeaderBlock = styled.div``;
const SaveButton = styled.button``;
const BackIconContainer = styled.div`
  :hover {
    border-radius: 50%;
    background-color: lightgrey;
  }
`;
