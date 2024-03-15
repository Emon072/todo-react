import { create } from 'zustand';
import { NoteDataArr } from '../NoteDataArr';

const useNoteStore = create((set) => ({
  NoteDataArr: NoteDataArr,
  DirectoryList: ['Main', 'Job', 'Study'],
  addNote: (note) => set((state) => ({
    NoteDataArr: [...state.NoteDataArr, note],
  })),
  updateNote: (updatedNote) => set((state) => ({
    NoteDataArr: state.NoteDataArr.map((note) =>
      note.id === updatedNote.id ? { ...note, ...updatedNote } : note
    ),
  })),
  deleteNote: (noteId) => set((state) => ({
    NoteDataArr: state.NoteDataArr.filter((note) => note.id !== noteId),
  })),
}));

export default useNoteStore;
