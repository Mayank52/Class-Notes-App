export const initialState = {
  notes: [],
  classes: [],
  activeClassId: null,
  activeNote: null,
  user: JSON.parse(localStorage.getItem("user")),
};

export const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case "SET_CLASSES":
      return {
        ...state,
        classes: action.payload,
      };
    case "SET_NOTES":
      return {
        ...state,
        notes: action.payload,
      };
    case "CREATE_CLASS":
      return {
        ...state,
        classes: [...state.classes, action.payload],
      };
    case "DELETE_CLASS": {
      const activeClassId = action.payload;

      let updatedClasses = state.classes.filter(
        (classobj) => classobj._id != activeClassId
      );

      //if there are classes left, then change the activeClassId to update the notes array
      if (updatedClasses.length > 0)
        return {
          ...state,
          classes: updatedClasses,
          activeClassId: updatedClasses[0]._id,
        };
      //else empty the notes state as there are no more classes left
      else {
        return {
          ...state,
          classes: updatedClasses,
          notes: [],
        };
      }
    }
    case "RENAME_CLASS": {
      const { classId, newClassname } = action.payload;

      let updatedClasses = state.classes.map((classObj) => {
        if (classObj._id == classId)
          return { ...classObj, classname: newClassname };
        else return classObj;
      });

      return {
        ...state,
        classes: updatedClasses,
      };
    }
    case "UPDATE_CLASS": {
      const updateClassObj = action.payload;

      let updatedClasses = state.classes.map((classObj) => {
        if (classObj._id == updateClassObj._id) return updateClassObj;
        else return classObj;
      });

      return {
        ...state,
        classes: updatedClasses,
      };
    }
    case "SET_ACTIVE_CLASS":
      return {
        ...state,
        activeClassId: action.payload,
      };
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note._id != action.payload),
      };
    case "UPDATE_NOTE":
      return {
        ...state,
        notes: action.payload,
      };
    case "CHANGE_ACTIVE_NOTE":
      return {
        ...state,
        activeNote: action.payload,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
