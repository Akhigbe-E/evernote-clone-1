import React, { useState, useEffect } from 'react';

import Sidebar from './components/sidebar/Sidebar';
import Editor from './components/editor/Editor';
import './App.css';

const firebase = require('firebase')

const App = () => {
  const initialState = {
    selectedNoteIndex: null,
    selectedNote: null,
    notes: null
  }
  const [{
    selectedNoteIndex, selectedNote, notes }, setstate] = useState(initialState)

  useEffect(() => {
    firebase.firestore().collection('notes').onSnapshot(serverUpdate => {
      const notes = serverUpdate.docs.map(_doc => {
        const data = _doc.data();
        data['id'] = _doc.id;
        return data;
      })
      console.log(notes)
      setstate({ notes })
    })
  }, [])

  return (
    <div className="app-container">
      <Sidebar selectedNoteIndex={selectedNoteIndex} notes={notes} />
      <Editor />
    </div>
  );
}

export default App;
