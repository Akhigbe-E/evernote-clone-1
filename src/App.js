import React, { useState, useEffect } from 'react';
import './App.css';

const firebase = require('firebase')

const App = () => {
  const initialState = {
    selectedNoteIndex: null,
    selectedNote: null,
    notes: null
  }
  const [state, setstate] = useState(initialState)

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
    // return () => {
    //   cleanup
    // }
  }, [])

  return (
    <div >
      Hello World!
    </div>
  );
}

export default App;
