"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { TypeAnimation } from "react-type-animation";
import "react-tabs/style/react-tabs.css";


const Note = {
  id: Number,
  title: String,
  content: String,
};

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [activeTab, setActiveTab] = useState("active");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/notes");
        const notes = response.data.map((note) => ({
          ...note,
          colorClass: localStorage.getItem(`selectedTag_${note.id}`) || "",
        }));

        setNotes(notes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotes();
  }, []);

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
      console.log("Note added successfully at handleAddNote:", newNote)

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

  const handleEditClick = (event, note) => {
    event.stopPropagation();
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);

    const storedTag = localStorage.getItem(`selectedTag_${note.id}`);
    setSelectedTag(storedTag);
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
      console.log("Note updated successfully at handleUpdateNote:", updatedNote)

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

  const deleteNote = async (event, noteId) => {
    event.stopPropagation();

    try {
      await axios.delete(`http://localhost:3001/notes/${noteId}`);
      const updatedNotes = notes.filter((note) => note.id !== noteId);

      setNotes(updatedNotes);
    } catch (error) {
      console.error(error);
    }
  };

  const handleArchiveNote = async (noteId) => {
    try {
      await axios.put(`http://localhost:3001/notes/${noteId}/archive`);
      const updatedNotes = notes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              archived: true,
              colorClass: localStorage.getItem(`selectedTag_${noteId}`),
            }
          : note
      );
      setNotes(updatedNotes);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnarchiveNote = async (noteId) => {
    try {
      await axios.put(`http://localhost:3001/notes/${noteId}/unarchive`);
      const updatedNotes = notes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              archived: false,
              colorClass: localStorage.getItem(`selectedTag_${noteId}`),
            }
          : note
      );
      setNotes(updatedNotes);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
    setSelectedTag(note.tag);
  };

  const handleChange = (event) => {
    const selectedTag = event.target.value;
    setSelectedTag(selectedTag);
  };

  return (
    <div className="app-container">
      <div className="title-container">
        <TypeAnimation
          sequence={["Welcome to...", 1000, "My Notes", 1000]}
          wrapper="span"
          speed={10}
          style={{ fontSize: "3rem" }}
        />
      </div>
      <div className="content-container">
        <div className="form-container">
          <form
            className="note-form"
            onSubmit={(e) =>
              selectedNote ? handleUpdateNote(e) : handleAddNote(e)
            }
          >
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="title"
              required //built-in HTML form validation -- This triggers a modal pop up with a message
            />

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
              rows={10}
              required //built-in HTML form validation -- This triggers a modal pop up with a message
              style={{ whiteSpace: "pre-wrap" }}
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
        <div className="notes-container">
          <div className="toggle-buttons">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="filter-container"
            >
              <option value="active">All Notes</option>
              <option value="archived">Archived Notes</option>
              <option value="selection">Filter by Tag</option>
            </select>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="filter-container"
            >
              <option value="">Select a Tag</option>
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="inspirational">Inspirational</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="notes-section">
            {activeTab === "active" && (
              <>
                <h2>All Notes</h2>
                <div className="notes-grid">
                  {notes
                    .filter((note) => !note.archived)
                    .map((note) => (
                      <div
                        className={`note-item ${note.colorClass}`}
                        key={note.id}
                      >
                        <div className="notes-header">
                          <button onClick={() => handleArchiveNote(note.id)}>
                            <Image
                              src="/archive.png"
                              alt="Archive Icon"
                              width={30}
                              height={30}
                            />
                          </button>
                          <button onClick={(e) => deleteNote(e, note.id)}>
                            <Image
                              src="/delete.png"
                              alt="Delete Icon"
                              width={30}
                              height={30}
                            />
                          </button>
                          <button onClick={(e) => handleEditClick(e, note)}>
                            <Image
                              src="/edit.png"
                              alt="Edit Icon"
                              width={30}
                              height={30}
                            />
                          </button>
                        </div>
                        <div className="notes-content">
                          <h2 className="notes-title">{note.title}</h2>
                          <p>{note.content}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </>
            )}
            {activeTab === "archived" && (
              <>
                <h2>Archived Notes</h2>
                <div className="notes-grid">
                  {notes
                    .filter((note) => note.archived)
                    .map((note) => (
                      <div
                        className={`note-item ${note.colorClass}`}
                        key={note.id}
                        onClick={() => handleNoteClick(note)}
                      >
                        <div className="notes-header">
                          <button onClick={() => handleUnarchiveNote(note.id)}>
                            Unarchive
                          </button>
                          <button onClick={(e) => deleteNote(e, note.id)}>
                            <Image
                              src="/delete.png"
                              alt="Delete Icon"
                              width={20}
                              height={20}
                            />
                          </button>
                        </div>
                        <div className="notes-content">
                          <h2 className="notes-title">{note.title}</h2>
                          <p>{note.content}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </>
            )}
            {activeTab === "selection" && (
              <>
                <h2>Filtered Notes</h2>
                <div className="notes-grid">
                  {notes
                    .filter(
                      (note) => selectedTag === "" || note.tag === selectedTag
                    )
                    .map((note) => (
                      <div
                        className={`note-item ${note.colorClass}`}
                        key={note.id}
                      >
                        <div className="notes-header">
                          <button onClick={() => handleArchiveNote(note.id)}>
                            <Image
                              src="/archive.png"
                              alt="Archive Icon"
                              width={30}
                              height={30}
                            />
                          </button>
                          <button onClick={(e) => deleteNote(e, note.id)}>
                            <Image
                              src="/delete.png"
                              alt="Delete Icon"
                              width={30}
                              height={30}
                            />
                          </button>
                          <button onClick={(e) => handleEditClick(e, note)}>
                            <Image
                              src="/edit.png"
                              alt="Edit Icon"
                              width={30}
                              height={30}
                            />
                          </button>
                        </div>
                        <div className="notes-content">
                          <h2 className="notes-title">{note.title}</h2>
                          <p>{note.content}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
