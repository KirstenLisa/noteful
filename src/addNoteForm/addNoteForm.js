import React from 'react';

class AddNote extends React.Component {

    render() {



        return(
            <div className="mainAddNote">
                <h1>
                    Create a Note
                </h1>

                <form>
                    
               
                    <div className="addNoteButtons">
                        <button type='button' onClick={this.props.onClickBack}>
                            Back
                        </button>
           
                        <button type='submit'>
                            Save
                        </button>
                    </div>
              
                </form>
            </div>
            
        )
    }
}

export default AddNote;