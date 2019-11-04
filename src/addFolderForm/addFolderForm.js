import React from 'react';
import NoteContext from '../NoteContext';
import ValidationError from "../validationError";
import PropTypes from 'prop-types';
import './addFolderForm.css'


class AddFolder extends React.Component {

    static contextType = NoteContext;

    constructor(props) {
        super(props);
        this.state = {
          folderName: {
            value: '',
            touched: false
          },
          error: null}}

    updateFolderName(name) {
        this.setState({folderName: {value: name, touched: true}});
    }

    handleSubmit(e) {
        e.preventDefault();
        const { name } = e.target;
        const newFolder = {name: name.value}
        console.log(newFolder)


        fetch('http://localhost:9090/folders', {
            method: 'POST',
            body: JSON.stringify(newFolder),
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
            console.log(this.context)
            this.context.addFolder(data)
            this.props.history.push('/')  
          })
         
          .catch(error => {
            this.setState({ error })
          })
      } 
    

    validateFolderName(fieldValue) {
        const folderName = this.state.folderName.value.trim();
        if (folderName.length === 0) {
          return 'Foldername is required';
        } else if (folderName.length < 3) {
          return 'Foldername must be at least 3 characters long';
        }
      }

    render() {

        const {error} = this.state;
        const nameError = this.validateFolderName();


        return(
            <form className="addFolderForm" onSubmit={e => this.handleSubmit(e)}>
                <div className='addNote_error' role='alert'>
                {error && <p>{error.message}</p>}</div>
                <h2>Create a new folder</h2>
                <div className="folderName">* required field</div>
                    <label htmlFor="foldername">Foldername *</label>
                    <input
                        type="text"
                        className="registration_control"
                        name="name"
                        id="name"
                        onChange={e => this.updateFolderName(e.target.value)}/>
                    {this.state.folderName.touched && (
                    <ValidationError message={nameError} />
)}

                    <button type='button' onClick={() => this.props.history.push('/')}>
                        Cancel
                    </button>
           
                    <button
                        type="submit"
                        className="save_button"
                        disabled={
                            this.validateFolderName()}>
                            Save
                    </button>
            </form>
        )
    }
}

AddFolder.propTypes = {
    folders: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }))
  };

export default AddFolder;