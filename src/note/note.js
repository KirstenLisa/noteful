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
                
                <button type="button" className="deleteButton">
                    Remove
                </button>

                
            </div>
        )
    }
}

export default withRouter(Note);