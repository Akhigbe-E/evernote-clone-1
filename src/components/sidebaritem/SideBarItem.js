import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../../helpers';

const SideBarItem = ({ index, note, classes, selectedNoteIndex, selectNote, deleteNote }) => {
    const { listItem, textSection, deleteIcon } = classes;
    const handleNoteSelection = (note, index) => {
        selectNote(note, index)
    }
    const handleNoteDeletion = ({ title }) => {
        if (!window.confirm(`Are you sure you want to delete: ${title}`)) return
        deleteNote(note)
    }
    return (
        <div key={index}>
            <ListItem className={listItem} selected={selectedNoteIndex === index} alignItems="flex-start" >
                <div className={textSection} onClick={() => { handleNoteSelection(note, index) }}>
                    <ListItemText primary={note.title} secondary={removeHTMLTags(note.body.substring(0, 30)) + '...'}> </ListItemText>
                </div>
                <DeleteIcon className={deleteIcon} onClick={() => { handleNoteDeletion(note) }}></DeleteIcon>
            </ListItem>
        </div>
    )
}

export default withStyles(styles)(SideBarItem)