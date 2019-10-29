import React from 'react';
import { NavLink, Link } from 'react-router-dom'
import './note.css'

class Note extends React.Component {


    render() {

        const note = this.props.note;



        return(
            <div className="main_note">
                <div className="noteHeader">
                    <h2>{note.name}</h2>

                </div>
                <div className="noteContent">
                    {note.content}
                </div>
                <p>{note.modified}</p>
                <button className="deleteButton">
                    Remove
                </button>
            </div>
        )
    }
}

export default Note;