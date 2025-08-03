"use client";

import { useState } from "react";

interface NotesClientProps {
  notes: Array<{ id: string; title: string; content: string }>;
}

const NotesClient: React.FC<NotesClientProps> = ({ notes }) => {
  const [newNote, setNewNote] = useState("");
  const [notesList, setNotesList] = useState(notes);

  const handleAddNote = () => {
    const newNoteObject = {
      id: Date.now().toString(),
      title: newNote,
      content: "",
    };
    setNotesList([...notesList, newNoteObject]);
    setNewNote("");
  };

  return (
    <div>
      <input
        type="text"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder="Add a new note"
      />
      <button onClick={handleAddNote}>Add Note</button>
      <ul>
        {notesList.map((note) => (
          <li key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesClient;
