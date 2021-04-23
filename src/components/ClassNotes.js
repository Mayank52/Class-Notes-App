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
        {notes.length > 0 ? (
          notes.map((note) => {
            return (
              <Note
                key={note._id}
                id={note._id}
                note={note}
                deleteNote={deleteNote}
                setActiveNote={setActiveNote}
              />
            );
          })
        ) : (
          <EmptyNotesContainer>
            <EmptyNotesMessage>No Notes here. Click on '+' icon to add new notes</EmptyNotesMessage>
          </EmptyNotesContainer>
        )}
      </NotesContainer>
    </Container>
  );
}

export default ClassNotes;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 82vw;
  padding: 2%;
`;

const NotesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const AddNewNoteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
const HeaderH1 = styled.h1``;

const HeaderBlock = styled.div`
  display: flex;
`;

const ClassDeleteButton = styled.button`
`;

const EmptyNotesContainer = styled.div``
const EmptyNotesMessage = styled.div``