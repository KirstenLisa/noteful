import React from 'react';
import NoteContext from '../NoteContext';
import ValidationError from "../validationError";
import PropTypes from 'prop-types';
import './addNoteForm.css'

class AddNote extends React.Component {

    static contextType = NoteContext;

    constructor(props) {
        super(props);
        this.state = {
          noteName: {
            value: '',
            touched: false
          },
          noteContent: {
            value: '',
            touched: false
          },
          folder: {
              value: '',
              touched: false
          },
          error: null
          }}


    updateNoteName(name) {
        this.setState({noteName: {value: name, touched: true}});
    }

    updateContent(content) {
        this.setState({noteContent: {value: content, touched: true}});
    }

    updateFolder(folder) {
        this.setState({folder: {value: folder, touched: true}});  
        }
      

    validateNoteName() {
        const noteName = this.state.noteName.value.trim();
        if (noteName.length === 0) {
          return 'Name is required';
        } else if (noteName.length < 3) {
          return 'Name must be at least 3 characters long';
        }
      }

    validateNoteContent() {
        const noteContent = this.state.noteContent.value.trim();
        if (noteContent.length === 0) {
          return 'Some content is required';
        } else if (noteContent.length < 3) {
          return 'Content must be at least 3 characters long';
        }
      }

      validateSelection(){
          const selectedFolder = this.state.folder.value;
          console.log('selectedFolder:' + selectedFolder);
          if(selectedFolder === "None" || selectedFolder === '') {
            return 'Folder is required';
          }
      }

      disableButton() {
          if(this.validateNoteName() ||this.validateNoteContent() || 
          this.validateSelection()) {
              return true
          }
      }

    

      handleSubmit(e) {
        e.preventDefault();

        const {name, folder, content} = e.target
        

        const newNote = {
            name: name.value,
            modified: new Date(),
            folderId: folder.value,
            content: content.value 
        }


        fetch('http://localhost:9090/notes', {
            method: 'POST',
            body: JSON.stringify(newNote),
            headers: {
              'content-type': 'application/json'
            }
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
          .then(data => {
            console.log(data)
            this.context.addNote(data)
            this.props.history.push(`/folder/${data.folderId}`)  
          })
         
          .catch(error => {
            this.setState({ error })
          })
      } 

    render() {

        const {error} = this.state;

        const folders = this
          .context
          .folders
          .map(
            (folder, i) => <option value={folder.id} key={i} id={folder.id}>{folder.name}</option>
          );

        const nameError = this.validateNoteName();
        const contentError = this.validateNoteContent();
        const folderError = this.validateSelection();
        const buttonDisabled = this.disableButton();


        return(
            <form className="addNoteForm" onSubmit={e => this.handleSubmit(e)}>
                <div className='addNote_error' role='alert'>
                {error && <p>{error.message}</p>}
                </div>
                <h2>Create a new note</h2>
                <div className="noteName">* required field</div>
                
                <div className="form-group">
                    <label htmlFor="notename">Name *</label>
                    <input
                        type="text"
                        className="registration_control"
                        name="name"
                        id="name"
                        onChange={e => this.updateNoteName(e.target.value)}/>
                    {this.state.noteName.touched && (
                    <ValidationError message={nameError} />)}
                </div>
               
                <div className="form-group">
                    <label htmlFor="notecontent">Content *</label>
                    <input
                        type="text"
                        className="registration_control"
                        name="content"
                        id="content"
                        onChange={e => this.updateContent(e.target.value)}/>
                    {this.state.noteContent.touched && (
                    <ValidationError message={contentError} />)}
                </div>

                <div className="folder-select">
                    <label htmlFor="folder">Select a folder: *</label>
                    <select
                    name="folder"
                    onChange={e => this.updateFolder(e.target.value)}>
                    <option value={"None"}>Select one...</option>
                    {folders}
                    </select>
                    {this.state.folder.touched && (
                    <ValidationError message={folderError} />)}
                </div>

                <div className="note_button_group">
                    <button type='button' onClick={() => this.props.history.push('/')}>
                        Cancel
                    </button>
           
                    <button
                        type="submit"
                        className="save_button"
                        disabled={buttonDisabled}>
                            Save
                    </button>
                </div>

            </form>
        )
    }
}

AddNote.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        modified: PropTypes.string.isRequired,
        folderId: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
    }))
  };

export default AddNote;