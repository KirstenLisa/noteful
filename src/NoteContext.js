import React from 'react'

const NoteContext = React.createContext({
  folders: [],
  notes: [],
  addNote: () => {},
  addFolder: () => {},
  deleteNote: () => {},
  updateNote: () => {}
})

export default NoteContext;