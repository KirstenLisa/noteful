import React from 'react';
import { Route, Link } from 'react-router-dom'
import STORE from './store.js';
import FolderList from './folderList/folderList.js'
import NoteList from './noteList/noteList.js'
import AddNote from './addNoteForm/addNoteForm.js'
import AddFolder from './addFolderForm/addFolderForm.js'
import Note from './note/note.js'
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      folders: STORE.folders,
      notes: STORE.notes
    };
  }
  
 

  render() {



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

          <div className="sidebar">
            <Route
              exact
              path='/'
              render={() =>
                <FolderList 
                  folders={this.state.folders} 
                  />}
                />
              <Route
                exact
                path='/folder/:folderId'
                render={routeProps => {
                  const folderId = routeProps.match.params.folderId;
                  const notesForFolder = this.state.notes
                  .filter(note => note.folderId === folderId);
                  return <FolderList {...routeProps} 
                                      folders={this.state.folders} 
                                      notes={notesForFolder}      
                  />
                  }
                }
                />
          </div>

          <div className="mainContent">
            <Route
              exact
              path='/'
              render={() =>
                <NoteList
                  notes={this.state.notes} 
                />}
              />

            <Route
                exact
                path='/folder/:folderId'
                render={routeProps => {
                  const folderId = routeProps.match.params.folderId;
                  const notesForFolder = this.state.notes
                  .filter(note => note.folderId === folderId);
                  return <NoteList {...routeProps}  
                                      notes={notesForFolder}      
                  />
                  }
                }
                />

            <Route 
                    exact 
                    path="/note/:noteId"
                    render={routeProps => {
                      const noteId = routeProps.match.params.noteId;
                      const note = this.state.notes.find(note => note.id === noteId);
                      const folder = this.state.folders
                                    .find(folder => folder.id === note.folderId);
                      return <Note {...routeProps} note={note} folder={folder}
                      />}
                        
                    }
                />
          
          <Route 
                exact 
                path="/add-folder"
                render={({ history }) => {
                  return <AddFolder
                  onClickBack={() => history.goBack()}
                  />}}
              />

            <Route 
                exact 
                path="/add-note"
                render={({ history }) => {
                  return <AddNote
                  onClickBack={() => history.goBack()}
                  />}}
              />

          </div> 
        </main>
        </div>    
  );
}
}


export default App;
