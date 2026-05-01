import React from "react";
import Heading from "./Heading";
import Footer from "./Footer";
import Note from "./Note";
import InputArea from "./InputArea";
import notes from "../notes";

function App() {
  const [myNotes, setNotes] = React.useState(notes);

  function addNote(newNote) {
    setNotes(prevNotes => [...prevNotes, newNote]);
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem) => {
        return noteItem.key !== id;
      });
    });
  }


  return (
    <div>
      <Heading />
      <InputArea onAdd={addNote} notes={myNotes} />
      <Note notes={myNotes} onDel={deleteNote} />
      <Footer />
    </div>
  );
}

export default App;