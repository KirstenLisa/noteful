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
            <Route exact path="/add-note" component={AddNote} />
            <Route exact path="/add-folder" component={AddFolder} />
            <Route 
              exact 
              path="/note/:noteId"
              render={() =>
                <Note
                  notes={this.state.notes}
                />}
              /> 
          </div> 
        </main>
        </div>
        

      
  );
}
}


export default App;
