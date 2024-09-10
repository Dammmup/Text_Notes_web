// src/components/CreateNote.tsx
import React, { useState } from 'react';
import axios from 'axios';
import './CreateNote.css'; // Подключаем стили

const CreateNote: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/notes', {
        title,
        content,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(response.data);
      // Обработка ответа
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };
  

  return (
    <div className="create-note-container">
      <h2>Create Note</h2>
      <form onSubmit={handleSubmit} className="create-note-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="input-field"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="textarea-field"
        />
        <button type="submit" className="submit-button">
          Create Note
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
