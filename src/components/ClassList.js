import React, { useState } from "react";
import styled from "styled-components";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import { useStateValue } from "../Context/StateProvider";
import axios from "axios";

function ClassList() {
  const [{ user, classes }, dispatch] = useStateValue();
  const [newClassInput, setNewClassInput] = useState(false);
  const [newClassName, setNewClassName] = useState("");
  const [renameClassActive, setRenameClassActive] = useState("");
  const [renameClassInput, setRenameClassInput] = useState("");

  const addNewClassHandler = () => {
    console.log("Creating New Class...");
    createNewClass(newClassName, dispatch);
    setNewClassName("");
  };

  const createNewClass = async (classname) => {
    if (!classname) return;

    console.log("Creating Class");
    
    const classObj = await axios.post(
      `http://localhost:3000/api/class/${user.uid}`,
      {
        classname,
      }
    );
    console.log(classObj.data.data);

    dispatch({
      type: "CREATE_CLASS",
      payload: classObj.data.data,
    });
  };

  const renameClass = async (classId, newClassname) => {
    console.log("Renaming Class");

    let updatedClassObj = await axios.patch(
      `http://localhost:3000/api/class/${classId}`,
      { classname: newClassname }
    );

    console.log(updatedClassObj);

    dispatch({
      type: "RENAME_CLASS",
      payload: { classId, newClassname },
    });
  };

  const changeNotes = (classId) => {
    console.log("change notes called");

    dispatch({
      type: "SET_ACTIVE_CLASS",
      payload: classId,
    });
  };

  return (
    <Container>
      <ClassListHeader>
        <HeaderH1>Classes</HeaderH1>
        <AddNewClassContainer>
          <AddCircleIcon
            onClick={() => {
              setNewClassInput(!newClassInput);
            }}
          />
        </AddNewClassContainer>
      </ClassListHeader>
      {newClassInput ? (
        <NewClassInputContainer>
          <NewClassInput
            type="text"
            value={newClassName}
            onChange={(e) => {
              setNewClassName(e.target.value);
            }}
          />
          <NewClassButton onClick={addNewClassHandler}>
            Add Class
          </NewClassButton>
        </NewClassInputContainer>
      ) : (
        <></>
      )}
      <List>
        {classes.length == 0 ? (
          <EmptyClassListContainer>
            <EmptyClassListMessage>
              No Classes made yet. Click on '+' icon to add new class
            </EmptyClassListMessage>
          </EmptyClassListContainer>
        ) : (
          classes.map((clss) => {
            return (
              <ListItemContainer key={clss._id}>
                {!(renameClassActive == clss._id) ? (
                  <ClassNameContainer
                    onClick={() => {
                      changeNotes(clss._id, dispatch);
                    }}
                  >
                    <Link to="/notes">
                      <ListItem classid={clss._id}>{clss.classname}</ListItem>
                    </Link>
                    <EditIcon
                      onClick={() => {
                        setRenameClassActive(clss._id);
                      }}
                    />
                  </ClassNameContainer>
                ) : (
                  <RenameClassContainer>
                    <RenameClassInput
                      placeholder={clss.classname}
                      value={renameClassInput}
                      onChange={(e) => {
                        setRenameClassInput(e.target.value);
                      }}
                    />
                    <RenameIconsContainer>
                      <CloseIcon
                        onClick={() => {
                          setRenameClassActive("");
                          setRenameClassInput("");
                        }}
                      />
                      <DoneIcon
                        onClick={() => {
                          renameClass(clss._id, renameClassInput, dispatch);
                          setRenameClassActive("");
                          setRenameClassInput("");
                        }}
                      />
                    </RenameIconsContainer>
                  </RenameClassContainer>
                )}
              </ListItemContainer>
            );
          })
        )}
      </List>
    </Container>
  );
}

export default ClassList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid grey;
  padding: 1%;
  width: 18vw;
`;
const ClassListHeader = styled.div`
  display: flex;
`;
const HeaderH1 = styled.h1``;
const AddNewClassContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const List = styled.div``;
const ListItem = styled.div``;
const NewClassInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const NewClassInput = styled.input``;
const NewClassButton = styled.button``;
const ListItemContainer = styled.div`
  cursor: pointer;
`;

const ClassNameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2%;
  :hover {
    background: lightgrey;
    border-radius: 4px;
  }
`;
const RenameClassContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2%;
  background-color: lightgrey;
  border-radius: 4px;
`;
const RenameClassInput = styled.input`
  outline: none;
  border: none;
  background-color: lightgrey;
  padding: 1%;
`;
const RenameIconsContainer = styled.div`
  display: flex;
`;
const EmptyClassListContainer = styled.div``;
const EmptyClassListMessage = styled.div``;
