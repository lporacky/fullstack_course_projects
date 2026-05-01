import React, {useState} from "react";

function InputArea(props) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [notesList, setNotesList] = useState(props.notes);

    function handleTitleChange(event) {
        setTitle(event.target.value);
    }

    function handleContentChange(event) {
        setContent(event.target.value);
    }

    function submitNote() {
        const newNote = {
            key: notesList.length + 1,
            title: title,
            content: content
        };
        props.onAdd(newNote);
        setTitle("");
        setContent("");
    }

    return (
        <div className="form">
            <form>
        <input type="text" name="title" placeholder="Title" value={title} onChange={handleTitleChange}/>
        <input type="text" name="content" placeholder="Take a note..." value={content} onChange={handleContentChange}/>
        <button onClick={submitNote}>
          <span>Add</span>
        </button>
      </form>
      </div>
    );
}

export default InputArea;