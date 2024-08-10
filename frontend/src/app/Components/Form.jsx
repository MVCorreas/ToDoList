import React, { useState } from "react";
import axios from "axios";

export const FormComponent = ({ notes, setNotes }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedTag, setSelectedTag] = useState("");

  const handleAddNote = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/notes",
        {
          title,
          content,
          tag: selectedTag,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const newNote = response.data;
      let colorClass;
      switch (selectedTag) {
        case "personal":
          colorClass = "personal";
          break;
        case "work":
          colorClass = "work";
          break;
        case "inspirational":
          colorClass = "inspirational";
          break;
        default:
          colorClass = ""; // Default color or no class
      }

      setNotes([...notes, { ...newNote, colorClass }]);
      setTitle("");
      setContent("");
      setSelectedTag("");

      localStorage.setItem(`selectedTag_${newNote.id}`, selectedTag);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateNote = async (e) => {
    e.preventDefault();

    if (!selectedNote) {
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3001/notes/${selectedNote.id}`,
        {
          title,
          content,
          tag: selectedTag,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const updatedNote = response.data;
      const updatedNoteList = notes.map((note) =>
        note.id === selectedNote.id
          ? { ...updatedNote, colorClass: selectedTag }
          : note
      );

      setNotes(updatedNoteList);
      setTitle("");
      setContent("");
      setSelectedNote(null);

      if (!selectedTag) {
        setSelectedTag(selectedNote.colorClass);
      }

      localStorage.setItem(`selectedTag_${selectedNote.id}`, selectedTag);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  return (
    <div className="form-container">
 <form
      className="note-form"
      onSubmit={(e) =>
        selectedNote ? handleUpdateNote(e) : handleAddNote(e)
      }
    >
      <input
        value={title}
        style={{color: 'black'}}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="title"
        required
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        rows={10}
        required
        style={{ whiteSpace: "pre-wrap", color: 'black' }}
      />

      <div className="tag-selection">
        <ul className="tag-list">
          <li
            className={`tag-item personal ${
              selectedTag === "personal" ? "selected" : ""
            }`}
            onClick={() => setSelectedTag("personal")}
          >
            Personal
          </li>
          <li
            className={`tag-item work ${
              selectedTag === "work" ? "selected" : ""
            }`}
            onClick={() => setSelectedTag("work")}
          >
            Work
          </li>
          <li
            className={`tag-item inspirational ${
              selectedTag === "inspirational" ? "selected" : ""
            }`}
            onClick={() => setSelectedTag("inspirational")}
          >
            Inspirational
          </li>
          <li
            className={`tag-item other ${
              selectedTag === "other" ? "selected" : ""
            }`}
            onClick={() => setSelectedTag("other")}
          >
            Other
          </li>
        </ul>
      </div>
      {selectedNote ? (
        <div className="edit-buttons">
          <button type="submit">Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <button type="submit">Add Note</button>
      )}
    </form>
    </div>
   
  );
}
