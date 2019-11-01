import React from 'react'

const NoteContext = React.createContext({
  folders: [],
  notes: [],
  addNote: () => {},
  addFolder: () => {},
  deleteNote: () => {},
})

export default NoteContext;