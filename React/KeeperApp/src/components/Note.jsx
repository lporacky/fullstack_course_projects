import React from "react";

function Note(props) {
    return props.notes.map(note => {
        return (
            <div key={note.key} className="note">
                <h1>{note.title}</h1>
                <p>{note.content}</p>
                <button onClick={() => props.onDel(note.key)}>DELETE</button>
            </div>
        );
    });
}

export default Note;