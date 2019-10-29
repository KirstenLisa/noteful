import React from 'react';
import { NavLink, Link } from 'react-router-dom'
import './note.css'

class Note extends React.Component {


    render() {



        return(
            <div className="main_note">
                <div className="noteHeader">
                    Note, date modified, remove button
                </div>
                <div className="noteContent">
                    Content
                </div>
            </div>
        )
    }
}

export default Note;