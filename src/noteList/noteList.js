import React from 'react';
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import Note from '../note/note.js';
import './noteList.css'

class NoteList extends React.Component {



    render() {

        const notes = this.props.notes
            .map(
            (note, i) => <li className="noteItem" id={note.id} key={i}>
                            <Link to={`/note/${note.id}`} 
                            className="noteLink">
                                {note.name} <br/>
                                <p className="date">Modified {note.modified}</p>
                            </Link>
                            <button className="deleteButton">
                                Remove
                            </button>
                        </li>);

        return(
            <div className="notesMain">
                <ul className="noteList">
                   { notes }
                   
                </ul>

                
                <Link to={'/add-note'} className="addNoteButton">
                    Add Note
                    </Link>
                
            </div>
        );
    }
} 

export default NoteList;