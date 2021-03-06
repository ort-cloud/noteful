import React from "react";
import {NavLink, Link} from "react-router-dom";
import NoteContext from "../NoteContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CircleButton from "../CircleButton/CircleButton";
import {countNotesForFolder} from "../notes-helpers";
import "./NoteListNav.css";

export default function NoteListNav() {
  return (
    <NoteContext.Consumer>
      {({notes, folders}) => (
        <div className='NoteListNav'>
          <ul className='NoteListNav__list'>
            {folders.map(folder => (
              <li key={folder.folder_name}>
                <NavLink
                  key={folder.folder_id}
                  className='NoteListNav__folder-link'
                  to={`/folder/${folder.folder_id}`}
                >
                  <span className='NoteListNav__num-notes'>
                    {countNotesForFolder(notes, folder.folder_id)}
                  </span>
                  {folder.folder_name}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className='NoteListNav__button-wrapper'>
            <CircleButton
              tag={Link}
              to='/add-folder'
              type='button'
              className='NoteListNav__add-folder-button'
            >
              <FontAwesomeIcon icon='plus' />
              <br />
              Folder
            </CircleButton>
          </div>
        </div>
      )}
    </NoteContext.Consumer>
  );
}

NoteListNav.defaultProps = {
  folders: [],
};
