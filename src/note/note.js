import React from 'react';
import { withRouter } from 'react-router-dom';
import { format } from 'date-fns'
import './note.css'

class Note extends React.Component {


    render() {

        const note = this.props.note;
        const folder = this.props.folder;



        return(
            <div className="main_note">
                <header className="noteHeader">
                    <p>{format(new Date(note.modified), 'do MMM yyyy')}</p>
                    <h3>{folder.name}</h3>

                </header>
                <div className="noteContent">
                    <h2>{note.name}</h2>
                    {note.content}
                </div>
                
                <button type="button" className="deleteButton">
                    Remove
                </button>

                <button 
                    type="button" 
                    className="backButton"
                    onClick={() => this.props.history.goBack()}>
                    Back
                </button>
            </div>
        )
    }
}

export default withRouter(Note);