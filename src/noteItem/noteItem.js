import React from 'react';
import { Link } from 'react-router-dom'
import NoteContext from '../NoteContext'
import './noteItem.css'

class NoteItem extends React.Component {


    static contextType = NoteContext;

    deleteRequest = (e) => {
        e.preventDefault();
        const noteId = this.props.id
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

        return (
            <div className="notes">
                <Link to={`/note/${this.props.id}`} className="noteLink">
                    <h3 className="noteTitle">{this.props.name}</h3>
                    <p className="date">Modified on {this.props.date}</p>
                </Link>          
                <button 
                    className="deleteButton"
                    onClick={this.deleteRequest}>
                        Remove
                </button>
            </div>
        )
    }

}

export default NoteItem;