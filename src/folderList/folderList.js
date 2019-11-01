import React from 'react';
import { NavLink, Link } from 'react-router-dom'
import NoteContext from '../NoteContext';
import './folderList.css'

class FolderList extends React.Component {

    static contextType = NoteContext;


    render() {

        const folders = this.context.folders
            .map(
            (folder, i) => <li className="folderItem" id={folder.id} key={i}>
                                <NavLink 
                                    exact 
                                    to={`/folder/${folder.id}`}
                                    className="folderLink" 
                                    activeClassName="activeLink">
                                    {folder.name}
                                </NavLink>
                            </li>);

        return(
            <div className="folderMain">
                <ul className="navList">
                   {folders} 

                   <Link to={'/add-folder'} className="addFolderButton">
                    Add Folder
                    </Link>
                </ul>
                
                

            </div>
        );
    }
} 

export default FolderList;