import React from 'react';
import { format } from 'date-fns'
import NoteContext from '../NoteContext';
import './note.css'

class Note extends React.Component {


    static contextType = NoteContext;

    deleteRequest = (e) => {
        e.preventDefault();
        const noteId = this.props.match.params.noteId;
        console.log("NOTEID:" + noteId)
        fetch(`http://localhost:9090/notes/${noteId}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json'
        },
        })
        .then(res => {
          if (!res.ok) {
            // get the error message from the response,
            return res.json().then(error => {
              // then throw it
              throw error
            })
          }
          return res.json()
        })
        .then(() => {
          this.context.deleteNote(noteId)
        })
        .catch(error => {
          console.error(error)
        })
      }

    render() {

        const noteId = this.props.match.params.noteId;
        const note = this.context.notes.find(note => note.id === noteId);
        const folder = this.context.folders
                     .find(folder => folder.id === note.folderId);



          return(
            <div className="main_note">
                <button 
                    type="button" 
                    className="backButton"
                    onClick={() => this.props.history.goBack()}>
                    Back
                </button>
                <header className="noteHeader">
                    <h3>{folder.name}</h3>
                    <p>Modified on {format(new Date(note.modified), 'do MMM yyyy')}</p>
                    

                </header>
                <div className="noteContent">
                    <h2>{note.name}</h2>
                    {note.content}
                </div>
                
                <button 
                    type="button" 
                    className="deleteButton"
                    onClick={this.deleteRequest}>
                    Remove
                </button>
                
            </div>
        )
    }
}
export default Note;