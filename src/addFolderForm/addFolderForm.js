import React from 'react';


class AddFolder extends React.Component {

    render() {



        return(
            <div className="mainAddFolder">
                <h1>
                    Create a Folder
                </h1>

                <div className="addFolderButtons">
                    <button type='button' onClick={() => this.props.history.push('/')}>
                        Cancel
                    </button>
           
                    <button type='submit'>
                            Save
                    </button>
                </div>
            </div>
        )
    }
}

export default AddFolder;