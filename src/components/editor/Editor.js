import React, { useState, useCallback } from 'react';
import ReactQuill from 'react-quill';
import debounce from '../../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';


const Editor = ({ classes }) => {
    const { editorContainer } = classes
    const initialState = {
        text: "",
        title: "",
        id: ""
    }
    const [{ text, title, id }, setstate] = useState(initialState);

    const update = useCallback(
        debounce(() => {
            console.log('UPDATING DATABASE...')
        }, 1500),
        []
    )


    const updateBody = async text => {
        setstate({ text });
        update()
    }
    return (
        <div className={classes.editorContainer}>
            <ReactQuill value={text} onChange={updateBody} />
        </div>
    )
}

export default withStyles(styles)(Editor)