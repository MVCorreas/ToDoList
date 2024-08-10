"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormComponent } from "./Components/Form";
import { NotesSection } from "./Components/NotesSection";

import { TypeAnimation } from "react-type-animation";
import "react-tabs/style/react-tabs.css";

const Note = {
  id: Number,
  title: String,
  content: String,
};

export default function Home() {
  const [notes, setNotes] = useState([]);

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
          <FormComponent notes={notes} setNotes={setNotes} />
        </div>
        <NotesSection notes={notes} setNotes={setNotes} />
      </div>
    </div>
  );
}
