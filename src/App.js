import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";

// const sampleNotesShape = [{ x: 98, y: 836, note: "some note text" }];

const StyledTextArea = styled.textarea`
  height: 200px;
  width: 200px;
  border: 1px solid grey;
  position: absolute;
  top: ${(props) => props.y + "px"};
  left: ${(props) => props.x + "px"};
`;

const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    function clickListener(e) {
      if (e.shiftKey) {
        setNotes((prevNotes) => [...prevNotes, { x: e.pageX, y: e.pageY }]);
      }
    }
    document.addEventListener("click", clickListener, false);
    return () => document.removeEventListener("click", clickListener, false);
  }, []);

  return (
    <div>
      {notes.map((note) => {
        const handleChange = (e) => {
          const editedText = e.target.value;
          setNotes((prevNotes) =>
            prevNotes.reduce((acc, cv) => {
              if (cv.x === note.x && cv.y === note.y) {
                acc.push({ ...cv, note: editedText });
                return acc;
              } else {
                acc.push(cv);
                return acc;
              }
            }, [])
          );
        };

        return <StyledTextArea x={note.x} y={note.y} onChange={handleChange} />;
      })}
    </div>
  );
};

export default App;
