"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormComponent } from "./Components/Form";
import { NotesSection } from "./Components/NotesSection";
import { Title } from "./Components/Title";
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
      <Title />
      <div className="content-container">
        <FormComponent notes={notes} setNotes={setNotes} />
        <NotesSection notes={notes} setNotes={setNotes} />
      </div>
    </div>
  );
}
