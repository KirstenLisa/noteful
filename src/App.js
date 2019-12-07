import React from 'react';
import { Route, Link } from 'react-router-dom'
import NoteContext from './NoteContext'
import FolderList from './folderList/folderList.js'
import NoteList from './noteList/noteList.js'
import AddNote from './addNoteForm/addNoteForm.js'
import AddFolder from './addFolderForm/addFolderForm.js'
import Note from './note/note.js'
import UpdateNote from './updateNote/updateNote.js'
import config from './config'
import ErrorBoundaries from './errorBoundaries'
import './App.css';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      notes: []
    };
  }


componentDidMount() {
  Promise.all([
    fetch(config.API_FOLDERS_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }}),
      fetch(config.API_NOTES_ENDPOINT, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${config.API_KEY}`
        }})
  ])
      .then(([folderRes, notesRes]) => {
        if(!folderRes.ok) {
          throw new Error('Something went wrong, please try again later.')
        }
        if(!notesRes.ok) {
          throw new Error('Something went wrong, please try again later.')
        }
        return Promise.all([folderRes.json(), notesRes.json()]);
      })
      .then(([folders, notes]) => {
        this.setState({folders, notes});
        console.log(notes);
        console.log(folders)
      })
      .catch(error => {
        console.error({error});
      });
  }


  deleteNote = noteId => {
    let newNotes = this.state.notes.filter(note =>
      note.id !== noteId
  )
    this.setState({
      notes: newNotes
  })
}

addNote = note => {
  this.setState({
    notes: [ ...this.state.notes, note ],
  })
}

addFolder = folder => {
  this.setState({
    folders: [...this.state.folders, folder]
  })
}

updateNote = updatedNote => {
  const newNotes = this.state.notes.map(note =>
    (note.id == updatedNote.id)
    ? updatedNote
    : note)
  this.setState({
    notes: newNotes
  })
}

renderMain(){
  return(
  <div>
    {['/', '/folder/:folderId'].map(path =>
      <Route
        exact
        key={path}
        path={path}
        component={NoteList}
      />
    )}
    
      <Route 
          exact 
          path="/note/:noteId"
          component={Note}
          />
      
      <Route 
          exact 
          path="/add-folder"
          component={AddFolder}
          />

      <Route 
          exact 
          path="/add-note"
          component={AddNote}
          />

      <Route 
          exact 
          path="/note/:noteId/update-note"
          component={UpdateNote}
          />

        </div>

      
  );  
}
  
  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote,
      updateNote: this.updateNote
    }



  return (
    <div className="App">

        <header>
          <Link to={'/'} className="homeLink">
          <h1 className="mainHeadline">
            Noteful
          </h1>
          </Link>
        </header>


        <main className='mainApp'>
          <NoteContext.Provider value={contextValue}>

            <div className="sidebar">
              <ErrorBoundaries>
                <Route
                  exact
                  path='/'
                  component={FolderList}
                    />

                <Route
                  exact
                  path='/folder/:folderId'
                  component={FolderList}
                  />
              </ErrorBoundaries>
            </div>

            <div className="mainContent">
              <ErrorBoundaries>
                {this.renderMain()}
              </ErrorBoundaries>
              
            </div> 
          </NoteContext.Provider>
        </main>
        </div>    
  );
}
}


export default App;
