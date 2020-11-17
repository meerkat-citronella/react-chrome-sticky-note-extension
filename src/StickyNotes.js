/* global chrome */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";

import { localMode } from "./constants";
import { ShadowRoot } from "./ShadowRoot";

// const sampleNotesShape = [{ x: 98, y: 836, note: "some note text" }];

const Container = styled.div`
  z-index: 2;
  border: 1px solid grey;
  position: absolute;
  background: white;
  top: ${(props) => props.y + "px"};
  left: ${(props) => props.x + "px"};
`;

const Header = styled.div`
  height: 20px;
  background-color: papayawhip;
`;

const StyledButton = styled.button`
  height: 20px;
  border: none;
  opacity: 0.5;
  float: right;
`;

const StyledTextArea = styled.textarea`
  color: dark grey;
  height: 200px;
  width: 200px;
  border: none;
  background-color: hsla(0, 0%, 100%, 0.2);
`;

const StickyNotes = () => {
  const [notes, setNotes] = useState([]);
  const url = window.location.href;

  // listen for shift + click to add note
  useEffect(() => {
    function clickListener(e) {
      if (e.shiftKey) {
        setNotes((prevNotes) => [...prevNotes, { x: e.pageX, y: e.pageY }]);
      }
    }
    document.addEventListener("click", clickListener);
    return () => document.removeEventListener("click", clickListener);
  }, []);

  // get notes if they're there
  useEffect(() => {
    if (!localMode) {
      chrome.storage.local.get(url, (items) => {
        items[url] && setNotes(items[url]);
      });
    }
  }, []);

  // set()
  useEffect(() => {
    if (!localMode) {
      notes.length > 0
        ? chrome.storage.local.set({ [url]: notes })
        : chrome.storage.local.remove(url);
    }
  }, [notes]);

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

        const handleDelete = () => {
          setNotes((prevNotes) =>
            prevNotes.reduce((acc, cv) => {
              if (cv.x === note.x && cv.y === note.y) {
                return acc;
              } else {
                acc.push(cv);
                return acc;
              }
            }, [])
          );
        };

        return (
          <ShadowRoot>
            <Container x={note.x} y={note.y} className="react-sticky-note">
              <Header>
                <StyledButton onClick={handleDelete}>X</StyledButton>
              </Header>
              <StyledTextArea
                onChange={handleChange}
                value={note.note ? note.note : ""}
              />
            </Container>
          </ShadowRoot>
        );
      })}
    </div>
  );
};

export default StickyNotes;
