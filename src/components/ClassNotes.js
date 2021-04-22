import React from "react";
import styled from "styled-components";
import Note from "./Note";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useHistory } from "react-router";

function ClassNotes({ notes, deleteNote, deleteClass, setActiveNote }) {
  let history = useHistory();
  const openNoteEditor = () => {
    let newActiveNote = {
      _id: "",
      notename: "",
      notecontent: "",
      createdon: "",
    };

    setActiveNote(newActiveNote);

    history.push("/newNote");
  };

  return (
    <Container>
      <Header>
        <HeaderBlock>
          <HeaderH1>Your Notes</HeaderH1>
          <AddNewNoteContainer>
            <AddCircleIcon onClick={openNoteEditor} />
          </AddNewNoteContainer>
        </HeaderBlock>
        <HeaderBlock>
          <ClassDeleteButton onClick={deleteClass}>
            Delete Class
          </ClassDeleteButton>
        </HeaderBlock>
      </Header>
      <NotesContainer>
        {notes.map((note) => {
          return (
            <Note
              key={note._id}
              id={note._id}
              note={note}
              deleteNote={deleteNote}
              setActiveNote={setActiveNote}
            />
          );
        })}
      </NotesContainer>
    </Container>
  );
}

export default ClassNotes;

const Container = styled.div`
  flex-grow: 6;
  display: flex;
  flex-direction: column;
`;

const NotesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const AddNewNoteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  // width: 30%;
  // font-size: 2rem;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2%;
`;
const HeaderH1 = styled.h1``;

const HeaderBlock = styled.div`
  display: flex;
`;

const ClassDeleteButton = styled.button`
  // display: block;
`;
