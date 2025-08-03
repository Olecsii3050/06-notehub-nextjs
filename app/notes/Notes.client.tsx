"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchBox from "../../components/SearchBox/SearchBox";
import Pagination from "../../components/Pagination/Pagination";
import Modal from "../../components/Modal/Modal";
import NoteForm from "../../components/NoteForm/NoteForm";
import css from "./NotesClient.module.css";
import { fetchNotes } from "@/lib/api";

interface NotesClientProps {
  initialNotes: Array<{ id: string; title: string; content: string }>;
}

const NotesClient: React.FC<NotesClientProps> = ({ initialNotes }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [notesPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: notes = [], isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
    initialData: initialNotes,
  });

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);
  const totalPages = Math.ceil(filteredNotes.length / notesPerPage);

  const handlePageChange = (selected: number) => {
    setCurrentPage(selected);
  };

  return (
    <div className={css.container}>
      <SearchBox value={searchTerm} onChange={setSearchTerm} />
      <button onClick={() => setIsModalOpen(true)}>Add Note</button>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {currentNotes.map((note) => (
            <li key={note.id}>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
            </li>
          ))}
        </ul>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default NotesClient;
