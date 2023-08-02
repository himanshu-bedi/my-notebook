import { useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import { useContext } from "react";
import { BiMicrophone } from "react-icons/bi";
// import { Link } from "react-router-dom";
import "./css/speech.css";
const AddNote = (props) => {
  const context = useContext(NoteContext);
  const { addNote } = context;
//   const [speech, setSpeech] = useState(false);
  const Speechtoword = (name,e) => {
    e.preventDefault();
    window.SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new window.SpeechRecognition();
    recognition.interimResults = true;
    // recognition.maxAlternatives = 10;
    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.start();
    console.log(e);
    recognition.onresult = (event) => {
      console.log("target name" + e.target.name + e.target.value);
      
      const speechToText = event.results[0][0].transcript;
    //   setSpeech(speechToText);
      console.log(speechToText);
        if(name==='title')
      setNote({ ...Note, title: speechToText });
      else if(name==='description')
        setNote({ ...Note, description: speechToText });
        else if(name==='tag')
        setNote({ ...Note, tag: speechToText });
    };
  };
  const [Note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(Note.title, Note.description, Note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Added suceessfully", "success");
  };
  const onchange = (e) => {
    setNote({ ...Note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <form className="my-3">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control position-relative"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            placeholder="Enter Title"
            value={Note.title}
            onChange={onchange}
            minLength={5}
            required
          />

          <BiMicrophone
            className="my-2 h4 speech"
            onClick={Speechtoword.bind(this,'title')}
            
          ></BiMicrophone>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            placeholder="Enter description"
            value={Note.description}
            onChange={onchange}
            minLength={5}
            required
          />
          <BiMicrophone
            className="my-2 h4 speech"
            onClick={Speechtoword.bind(this,'description')}
            
          ></BiMicrophone>
        </div>
        <div className="form-group">
          <label htmlFor="tag">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            placeholder="Enter tag"
            value={Note.tag}
            onChange={onchange}
            minLength={5}
            required
          />
          <BiMicrophone
            className="my-2 h4 speech"
            onClick={Speechtoword.bind(this,'tag')}
            
          ></BiMicrophone>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={Note.title.length < 5 || Note.description.length < 5}
          onClick={handleClick}
        >
          Add Note
        </button>
      </form>
      <h2>Your Notes</h2>
    </div>
  );
};
export default AddNote;
