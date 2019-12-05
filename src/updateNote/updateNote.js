import React, { Component } from  'react';
import NoteContext from '../NoteContext';
import config from '../config'

const Required = () => (
  <span className='UpdateNote__required'>*</span>
)

export default class UpdateNoteForm extends Component {

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
    fetch(config.API_ENDPOINT + `/${noteId}`, {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${config.API_KEY}`
        }
      })
    .then(res => {
      if(!res.ok) {
        return res.json().then(error => {
          throw error
        })
      }
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
    const { id, note_name, modified, content, folder_id } = this.state
    const updatedNote = { id, note_name, modified, content, folder_id }
    fetch(config.API_ENDPOINT + `/${noteId}`, {
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
        this.context.updateBookmark(updatedNote)
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
    const { error, note_name, modified, content, folder_id } = this.state
    return (
      <section className='UpdateBookmarkForm'>
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
            <label htmlFor='url'>
              
              <Required />
            </label>
            <input
            id='url'
            type='url'
            name='url'
            placeholder='www.url.com'
            required
            value={url}
            onChange={e => this.updateBookmarkUrl(e.target.value)}
        />
          </div>

          <div>
            <label htmlFor='description'>
              Description
            </label>
            <input
            id='description'
            type='text'
            name='description'
            placeholder='Bookmark description!'
            value={description}
            onChange={e => this.updateBookmarkDescription(e.target.value)}
        />
          </div>

          <div>
            <label htmlFor='rating'>
              Rating
              <Required />
            </label>
            <input
            id='rating'
            type='number'
            name='rating'
            placeholder= '5'
            min='1'
            max='5'
            required
            value={rating}
            onChange={e => this.updateBookmarkRating(e.target.value)}
        />
          </div>
          
          <div className="update_button_group">
            <button type='button' onClick={() => this.props.history.push('/')}>
              Cancel
            </button>
           
            <button
              type="submit"
              className="save_button"
              >
                Save changes
            </button>
                </div>
        </form>
      </section>
    )
  }
}