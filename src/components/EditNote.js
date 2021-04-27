import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import TextEditor from "./TextEditor";

function EditNote({ note, setActiveNote, setSaveButtonClicked }) {
  const [notename, setNoteName] = useState("");
  const [notecontent, setNoteContent] = useState("");

  const history = useHistory();

  useEffect(() => {
    if (note) {
      setNoteName(note.notename ? note.notename : "Enter Note Name");
      setNoteContent(
        note.notecontent ? note.notecontent : "Enter Note Content"
      );
    }

    console.log("useEffect called");
  }, []);

  const saveNote = (e) => {
    e.preventDefault();

    let currentNote = {
      ...note,
      notename,
      notecontent,
    };

    console.log("Current Note:", currentNote);

    setActiveNote(currentNote);
    setSaveButtonClicked(true);

    history.push("/");
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
  flex-grow: 5;
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
