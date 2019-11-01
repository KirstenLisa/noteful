import React from 'react';
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import NoteContext from '../NoteContext';
import './noteList.css'



class NoteList extends React.Component {
    
    static defaultProps = {
        match: {
          params: {}
        }
      }

    static contextType = NoteContext;

    render() {

        const folderId = this.props.match.params.folderId;
        const notesForFolder = this.context.notes
                    .filter(note => note.folderId === folderId);


        const notes = notesForFolder
            .map(
            (note, i) => <li className="noteItem" id={note.id} key={i}>
                            <Link to={`/note/${note.id}`} 
                            className="noteLink">
                                {note.name} <br/>
                                <p className="date">
                                Modified on {format(new Date(note.modified), 'do MMM yyyy')}</p>
                            </Link>
                            <button 
                                className="deleteButton"
                                onClick={this.deleteRequest}>
                                Remove
                            </button>
                        </li>);

        return(
            <div className="notesMain">
                <ul className="noteList">
                   { notes }
                   <Link to={'/add-note'} className="addNoteButton">
                    Add Note
                    </Link>
                   
                </ul>            
            </div>
        );
    }
} 

export default NoteList;