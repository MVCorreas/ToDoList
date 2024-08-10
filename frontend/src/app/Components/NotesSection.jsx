import React, {useState} from 'react'
import axios from "axios";
import Image from "next/image";

export const  NotesSection = ({ notes, setNotes }) => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [activeTab, setActiveTab] = useState("active");
  const [selectedTag, setSelectedTag] = useState("");

  const handleEditClick = (event, note) => {
    event.stopPropagation();
    setSelectedNote(note);
    setSelectedTag(localStorage.getItem(`selectedTag_${note.id}`));
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

  

  return (
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
                  <div className={`note-item ${note.colorClass}`} key={note.id}>
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
                  <div className={`note-item ${note.colorClass}`} key={note.id}>
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
                .filter((note) => selectedTag === "" || note.tag === selectedTag)
                .map((note) => (
                  <div className={`note-item ${note.colorClass}`} key={note.id}>
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
  );
}

