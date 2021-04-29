import React from "react";
import styled from "styled-components";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router";
import axios from "axios";
import { useStateValue } from "../Context/StateProvider";

function Note({ note }) {
  const [{ activeClassId }, dispatch] = useStateValue();
  let history = useHistory();
  
  const openNoteEditor = () => {
    dispatch({
      type: "CHANGE_ACTIVE_NOTE",
      payload: note,
    });

    history.push("/editNote");
  };

  const deleteNote = async (noteId) => {
    console.log("Deleting Note");

    console.log(activeClassId, noteId);
    let deletedNoteObj = await axios.delete(
      `http://localhost:3000/api/notes/${activeClassId}/${noteId}`
    );
    console.log(deletedNoteObj);

    dispatch({
      type: "DELETE_NOTE",
      payload: noteId,
    });

    dispatch({
      type: "UPDATE_CLASS",
      payload: deletedNoteObj.data.data,
    });
  };

  return (
    <Container>
      <NoteHeader>
        <NoteDate>{note.createdon}</NoteDate>
        <NoteButtons>
          <DeleteIcon
            onClick={() => {
              deleteNote(note._id);
            }}
          />
        </NoteButtons>
      </NoteHeader>
      <NoteName onClick={openNoteEditor}>{note.notename}</NoteName>
    </Container>
  );
}

export default Note;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 200px;
  background-color: yellow;
  margin: 1%;
  padding: 2%;

  :hover {
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.25);
  }
`;
const NoteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
`;

const NoteDate = styled.div``;
const NoteButtons = styled.div``;

const NoteName = styled.div`
  height: 100%;
`;
