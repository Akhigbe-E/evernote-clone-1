import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItem from '../sidebaritem/SideBarItem';

const Sidebar = ({ notes, classes, selectedNoteIndex, selectNote, newNote, deleteNote }) => {
    const initialState = {
        addingNote: false,
        title: null
    }
    const [state, setState] = useState(initialState)
    const { addingNote, title } = state;
    const { sidebarContainer, newNoteBtn, newNoteInput, newNoteSubmitBtn } = classes

    const newNoteBtnClick = () => {
        setState({ ...state, addingNote: !addingNote })
    }
    const updateTitle = text => {
        setState({ ...state, title: text })
    }

    const hadleNewNote = () => {
        newNote(title)
        setState({ title: null, addingNote: false })
    }

    const handleDeleteNote = (note) => {
        deleteNote(note)
    }
    const handleSelectNote = (note, index) => {
        selectNote(note, index)
    }
    if (notes === null) return <div>loading...</div>

    return (
        <div className={sidebarContainer}>
            <Button onClick={newNoteBtnClick} className={newNoteBtn}>{!addingNote ? 'New Note' : 'Cancel'}</Button>
            {
                addingNote ? (<div>
                    <input type="text" className={newNoteInput} placeholder="Enter note title" onKeyUp={e => updateTitle(e.target.value)} />
                    <Button className={newNoteSubmitBtn} onClick={hadleNewNote}>Submit Note</Button>
                </div>) : null
            }
            <List>
                {
                    notes.map((note, index) => {
                        return (
                            <div key={index}>
                                <SidebarItem note={note} index={index} selectedNoteIndex={selectedNoteIndex} selectNote={handleSelectNote} deleteNote={handleDeleteNote} />
                            </div>
                        )
                    })
                }
            </List>
        </div>
    )
}

export default withStyles(styles)(Sidebar)