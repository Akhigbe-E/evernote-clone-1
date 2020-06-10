import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItem from '../sidebaritem/SideBarItem';

const Sidebar = ({ notes, classes, selectedNoteIndex }) => {
    const initialState = {
        addingNote: false,
        title: null
    }
    const [{ addingNote, title }, setState] = useState(initialState)
    const { sidebarContainer, newNoteBtn, newNoteInput } = classes
    const newNoteBtnClick = () => {
        setState({ addingNote: !addingNote })
        console.log('new btn clicked')
    }
    const updateTitle = text => {
        console.log('This is the text', text)
    }
    return (
        <div className={sidebarContainer}>
            <Button onClick={newNoteBtnClick} className={newNoteBtn}>{!addingNote ? 'New Note' : 'Cancel'}</Button>
            {
                addingNote ? (<div>
                    <input type="text" className={newNoteInput} placeholder="Enter note title" onKeyUp={e => updateTitle(e.target.value)} />
                </div>) : null
            }
        </div>
    )
}

export default withStyles(styles)(Sidebar)