import React, { useState, useEffect } from 'react';

import Sidebar from './components/sidebar/Sidebar';
import Editor from './components/editor/Editor';
import './App.css';

const firebase = require('firebase')

const App = () => {
  const initialState = {
    selectedNoteIndex: null,
    selectedNote: null
  }
  const [state, setstate] = useState(initialState)
  const [notes, setNotes] = useState([])
  const { selectedNoteIndex, selectedNote } = state

  useEffect(() => {
    firebase
      .firestore()
      .collection('notes')
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data['id'] = _doc.id;
          return data;
        })
        setNotes(notes)
      })
  }, [])

  let newNoteID;

  // const newNote = async (title) => {
  //   const note = {
  //     title,
  //     body: ''
  //   }
  //   const newFromDB = await firebase.firestore().collection('notes').add({
  //     title: note.title,
  //     body: note.body,
  //     timestamp: firebase.firestore.FieldValue.serverTimestamp()
  //   })
  //   const newID = newFromDB.id;
  //   let newNotesArray = [...notes, note]
  //   setNotes(newNotesArray);
  //   newNoteID = newNotesArray.indexOf(newNotesArray.filter(note => {console.log(); return note.id === newID)[0]})
  //   console.log(newID)
  //   selectedNote(newNotesArray[newNoteID], newNoteID)
  // }

  const newNote = async title => {
    const note = {
      title,
      body: ''
    }
    const newFromDB = await firebase.firestore().collection('notes').add({
      ...note,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    const newID = newFromDB.id
    let newNotesArray = [...notes, { ...note, id: newID }]
    setNotes(newNotesArray)
    let newNoteIndex = newNotesArray.indexOf(newNotesArray.filter(note => note.id === newID)[0])
    selectNote(newNotesArray[newNoteIndex], newNoteIndex)
  }

  // useEffect(() => {
  //   setstate({ selectedNote: notes[newNoteID], selectedNoteIndex: newNoteID })
  // }, [notes])

  const deleteNote = (note) => {
    const noteIndex = notes.indexOf(note);
    setNotes(notes.filter(_note => _note !== note))
    if (noteIndex === selectedNoteIndex) {
      setstate({ selectedNoteIndex: null, selectedNote: null })
    } else {
      notes.length > 1 ? selectNote(notes[selectedNoteIndex - 1], selectedNoteIndex - 1) :
        setstate({ selectedNoteIndex: null, selectedNote: null })
    }
    firebase.firestore().collection('notes').doc(note.id).delete();
  }

  const selectNote = (note, index) => {
    setstate({ selectedNote: note, selectedNoteIndex: index })
  }
  const noteUpdate = (id, noteObj) => {
    console.log(noteObj)
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title: noteObj.title,
        body: noteObj.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
  }

  return (
    <div className="app-container">
      <Sidebar
        newNote={newNote}
        selectNote={selectNote}
        deleteNote={deleteNote}
        selectedNoteIndex={selectedNoteIndex}
        notes={notes} />
      {selectedNote ? (<Editor selectedNote={selectedNote} selectedNoteIndex={selectedNoteIndex} noteUpdate={noteUpdate} />) : null}
    </div>
  );
}

export default App;
