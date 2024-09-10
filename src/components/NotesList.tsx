// src/components/NotesList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateNote from './CreateNote';
import './NotesList.css'; // Подключаем стили
import Logout from './Logout';

interface Note {
  _id: string;
  title: string;
  content: string;
}

const NotesList: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [checkedNotes, setCheckedNotes] = useState<Record<string, boolean>>({});
  const [editMode, setEditMode] = useState<Record<string, boolean>>({});
  const [editedNotes, setEditedNotes] = useState<
    Record<string, { title: string; content: string }>
  >({});

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/notes', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setNotes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotes();
  }, []);

  const handleCheckboxChange = (noteId: string) => {
    setCheckedNotes((prev) => ({ ...prev, [noteId]: !prev[noteId] }));
  };

  const handleEditClick = (note: Note) => {
    setEditMode((prev) => ({ ...prev, [note._id]: true }));
    setEditedNotes((prev) => ({
      ...prev,
      [note._id]: { title: note.title, content: note.content },
    }));
  };

  const handleSaveClick = async (noteId: string) => {
    try {
      await axios.put(
        `http://localhost:3001/api/notes/${noteId}`,
        editedNotes[noteId],
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setEditMode((prev) => ({ ...prev, [noteId]: false }));
      setNotes((prev) =>
        prev.map((note) =>
          note._id === noteId ? { ...note, ...editedNotes[noteId] } : note
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = async (noteId: string) => {
    try {
      await axios.delete(`http://localhost:3001/api/notes/${noteId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setNotes((prev) => prev.filter((note) => note._id !== noteId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (
    noteId: string,
    field: string,
    value: string
  ) => {
    setEditedNotes((prev) => ({
      ...prev,
      [noteId]: { ...prev[noteId], [field]: value },
    }));
  };

  return (<>
  <div style={{marginLeft:'800px'}}>
   <Logout/>
   </div>
    <div className="notes-list-container">
      <div className="notes-section">
        <h2>Notes</h2>
        <ul className="notes-list">
          {notes.map((note) => (
            <li
              key={note._id}
              className={`note-item ${checkedNotes[note._id] ? 'checked' : ''}`}
            >
              {!editMode[note._id] && (
                <input
                  type="checkbox"
                  checked={checkedNotes[note._id] || false}
                  onChange={() => handleCheckboxChange(note._id)}
                  className="note-checkbox"
                />
              )}
              {editMode[note._id] ? (
                <div className="note-edit-form">
                  <input
                    type="text"
                    value={editedNotes[note._id]?.title || ''}
                    onChange={(e) =>
                      handleInputChange(note._id, 'title', e.target.value)
                    }
                    className="note-input"
                  />
                  <textarea
                    value={editedNotes[note._id]?.content || ''}
                    onChange={(e) =>
                      handleInputChange(note._id, 'content', e.target.value)
                    }
                    className="note-textarea"
                  />
                  <button onClick={() => handleSaveClick(note._id)} className="save-button">
                    Save
                  </button>
                </div>
              ) : (
                <div className="note-content">
                  <span className="note-title">{note.title}</span>
                  <span className="note-text">{note.content}</span>
                </div>
              )}
              <div className="note-actions">
                {!editMode[note._id] && (
                  <button
                    onClick={() => handleEditClick(note)}
                    disabled={checkedNotes[note._id]}
                    className={`edit-button ${checkedNotes[note._id] ? 'disabled' : ''}`}
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDeleteClick(note._id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="create-note-section">
        <CreateNote />
      </div>
    </div>
   
    </>
  );
};

export default NotesList;
