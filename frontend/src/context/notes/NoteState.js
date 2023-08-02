
import NoteContext from "./NoteContext"
import { useState } from "react";
const NoteState = (props) => {
  const host="https://inotebook-backend-5w3y.onrender.com";
  // const notesInitial = []
  const [notes, setNotes] = useState([])

  // get all notes 
  const getAllNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      }
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }


  //add note
  const addNote = async (title, description, tag) => {
    //to do api call
    
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST', 

      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem("token")
       
      },
      body: JSON.stringify({title,description,tag}) 
    });
    const note=await response.json();
    // console.log("adding a note",json)
    // const note =json;
    setNotes(notes.concat(note))
  }


  //delete note
  const deleteNote =async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      }
    });
    const json=await response.json();
    console.log(json);
    let newNotes = notes.filter((note) => { return note._id !== id })
    // getAllNotes()
    setNotes(newNotes)
  }

  //edit note
  const editNote = async (id, title, description, tag) => {
    //api call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT', 

      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem("token")
       
      },
      body: JSON.stringify({title,description,tag}) 
    });

    const json=await response.json();
    console.log(json)
    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
  }

  return (
    < NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getAllNotes }}>
      {props.children}
    </ NoteContext.Provider>
  )
}
export default NoteState