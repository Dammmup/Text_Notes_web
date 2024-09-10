// src/services/noteService.ts
import { api } from './api';

export const getNotes = async () => {
  const response = await api.get('/notes');
  return response.data;
};

export const addNote = async (note: { title: string; content: string }) => {
  const response = await api.post('/notes', note);
  return response.data;
};

export const deleteNote = async (id: string) => {
  await api.delete(`/notes/${id}`);
};
