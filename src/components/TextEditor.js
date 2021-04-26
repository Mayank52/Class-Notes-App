import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default function TextEditor({ notecontent, setNoteContent }) {
  const [quill, setQuill] = useState();

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    //clear out wrapper every time it renders, so that an extra editor does not get appended every render
    wrapper.innerHTML = "";

    const editor = document.createElement("div");
    wrapper.append(editor);

    const q = new Quill(editor, { theme: "snow" });
    console.log(notecontent);
    console.log(q.setContents(notecontent));
    // console.log(q.getContents());

    setQuill(q);
  }, []);

  useEffect(() => {
    if (!quill) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;

      const value = quill.getContents().ops;
      setNoteContent(value)
      // console.log(delta.ops, oldDelta.ops);
    };
    quill.on("text-change", handler);

    //remove the event on cleanup otherwise the application hangs
    return () => {
      quill.off("text-change", handler);
    };
  });

  return <Container id="container" ref={wrapperRef}></Container>;
}

const Container = styled.div`
  margin-top: 2%;
  // max-width: 78vw;
  .ql-editor {
    min-height: 70vh;
    // box-shadow: 0 0 5px 0 rgba(0, 0, 0.5);
  }
  .ql-container {
  }
`;
