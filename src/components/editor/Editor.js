import React, { useState, useCallback, useEffect } from 'react';
import ReactQuill from 'react-quill';
import debounce from '../../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';


const Editor = ({ classes, selectedNote, selectedNoteIndex, noteUpdate }) => {
    const { editorContainer } = classes;
    const { title: selectedTitle, body: selectedBody, id: selectedID } = selectedNote;

    const [title, setTitle] = useState(selectedTitle)
    const [body, setBody] = useState(selectedBody)
    const [id, setID] = useState(selectedID)

    useEffect(() => {
        setTitle(selectedTitle)
        setBody(selectedBody)
        setID(selectedID)
    }, [selectedNote])

    useEffect(() => {
        update(title, body, id)
    }, [title, body, id])

    const update = useCallback(
        debounce((title, body, id) => {
            noteUpdate(id, { title, body })
            console.log('UPDATING DATABASE...')
        }, 1500),
        []
    )
    const updateTitle = (val) => {
        setTitle(val)
    }

    return (
        <div className={classes.editorContainer}>
            <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
            <input
                className={classes.titleInput}
                placeholder="Note title..."
                value={title ? title : ''}
                onChange={e => updateTitle(e.target.value)}
            />
            <ReactQuill
                value={body}
                onChange={
                    val => {
                        setBody(val)
                    }
                } />
        </div>
    )
}

export default withStyles(styles)(Editor)