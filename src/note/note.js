import React from 'react';
import { format } from 'date-fns'
import NoteContext from '../NoteContext';
import PropTypes from 'prop-types';
import './note.css'

class Note extends React.Component {

    static defaultProps ={
        onDeleteNote: () => {},
      }

    static contextType = NoteContext;

    

    deleteRequest = (e) => {
        e.preventDefault();
        const noteId = this.props.match.params.noteId;
        const note = this.context.notes.find(note => note.id === noteId);
        const folder = this.context.folders
                    .find(folder => folder.id === note.folderId);
        const folderId = folder.id;
        
        console.log("folderid:" + folderId)
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
            this.props.history.push(`/folder/${folderId}`)
            this.context.deleteNote(noteId)
            this.props.onDeleteNote(noteId)
          
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

Note.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      modified: PropTypes.string.isRequired,
      folderId: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
  })),
  folders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}))
};


export default Note;