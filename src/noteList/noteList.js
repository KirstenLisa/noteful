import React from 'react';
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import NoteContext from '../NoteContext'
import NoteItem from '../noteItem/noteItem'
import PropTypes from 'prop-types';
import './noteList.css'



class NoteList extends React.Component {


  static contextType = NoteContext

    render() {


        const folderId = this.props.match.params.folderId;
        const notesForFolder = this.context.notes
                    .filter(note => note.folderId === folderId);


        const notes = notesForFolder
            .map(
            (note, i) => <li className="noteItem" id={note.id} key={i}>
                            <NoteItem 
                                name={note.name}
                                date = {format(new Date(note.modified), 'do MMM yyyy')}
                                id={note.id}
                                />
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

NoteList.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        modified: PropTypes.string.isRequired,
        folderId: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
    }))
  };



export default NoteList;