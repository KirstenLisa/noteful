import React, { Component } from  'react';
import NoteContext from '../NoteContext';
import PropTypes from 'prop-types';
import config from '../config'

const Required = () => (
  <span className='UpdateNote__required'>*</span>
)



export default class UpdateNote extends Component {

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  static contextType = NoteContext;

    constructor(props) {
        super(props);
        this.state = {
          id: '',
          note_name: '',
          modified: '',
          content: '',
          folder_id: '',
          error: null
          }}

  updateNoteName = (e) => {
    this.setState({note_name: e.target.value});
  }
    
  updateNoteContent = (e) => {
    this.setState({content: e.target.value});
  }
    
  updateNoteFolder = (e) => {
    this.setState({folder_id: e.target.value});  
  }


  componentDidMount() {
    const { noteId } = this.props.match.params
    console.log('NOTE: ' + noteId)
    console.log(config.API_NOTES_ENDPOINT + `/${noteId}`)
    fetch(config.API_NOTES_ENDPOINT + `/${noteId}`, {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${config.API_KEY}`
        }
      })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))

        return res.json()
    })
    .then(responseData => {
      console.log(responseData)
      this.setState({
        id: responseData.id,
        note_name: responseData.note_name,
        modified: responseData.modified, 
        content: responseData.content, 
        folder_id: responseData.folder_id
      });
          })
     
    .catch(error => {
        console.error(error)
        this.setState({ error });
        })
    }

  handleSubmit = e => {
    e.preventDefault()
    const { noteId } = this.props.match.params
    const { id, note_name, content, folder_id } = this.state
    const modified = new Date()
    const updatedNote = { id, note_name, modified, content, folder_id }
    fetch(config.API_NOTES_ENDPOINT + `/${noteId}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedNote),
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${config.API_KEY}`
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
      })
      .then(() => {
        this.resetFields(updatedNote)
        this.context.updateNote(updatedNote)
        this.props.history.push('/')
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }


  resetFields = (newFields) => {
    this.setState({
      id: newFields.id || '',
      note_name: newFields.note_name || '',
      modified: newFields.modified || '',
      content: newFields.content || '',
      folder_id: newFields.folder_id || '',
    })
  }

  /* state for inputs etc... */
  render() {
    const { noteId } = this.props.match.params
    const note = this.context.notes.find(note => note.id == noteId);
    const note_folder = this.context.folders
    .find(folder => folder.id == note.folder_id);
    const currentFolder = note_folder.folder_name
    console.log(currentFolder)
    const folders = this
    .context
    .folders
    .map(
      (folder, i) => <option value={folder.id} key={i} id={folder.id}>{folder.folder_name}</option>
    );
    const { error, note_name, modified, content, folder_id } = this.state
    return (
      <section className='UpdateNoteForm'>
        <h2>Edit Note</h2>
        <form onSubmit= {(e) => this.handleSubmit(e)}>
        <div className='UpdateNote__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <input
            type='hidden'
            name='id'
          />
          <div>
            <label htmlFor='title'>
              Note Name
              <Required />
            </label>
            <input
              id='note_name'
              type='text'
              name='note_name'
              placeholder='Great Note'
              required
              value={note_name}
              onChange={this.updateNoteName}
          />
          </div>

          <div>
            <label htmlFor='content'>
              Content
            </label>
            <input
            id='content'
            type='text'
            name='content'
            placeholder='Note content!'
            value={content}
            onChange={e => this.updateNoteContent}
        />
          </div>

          <div className="folder-select">
                <label htmlFor="folder">Select a folder: *</label>
                <select
                    name="folder"
                    onChange={this.updateNoteFolder}
                    aria-required="true" 
                    aria-describedby="folderError">
                    <option value={"None"}>{currentFolder}</option>
                    {folders}
                </select>
         </div>
          
          <div className="update_button_group">
            <button type='button' onClick={() => this.props.history.push('/')} className="updateButton">
              Cancel
            </button>
           
            <button
              type="submit"
              className="saveButton"
              >
                Save changes
            </button>
                </div>
        </form>
      </section>
    )
  }
}