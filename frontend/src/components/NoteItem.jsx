import NoteContext from '../context/notes/NoteContext'
import { useContext } from 'react'

const NoteItem = (props) => {
    const context = useContext(NoteContext)
    const {deleteNote}=context
    const { note,updateNote } = props;
    return (
        <figure>

                <h1>{note.title}</h1>
                <h2>{note.tag}</h2>
                <figcaption>
                    <p>{note.description}
                    
                    </p>
                </figcaption>
                <div>

                <button className="btn btn-dark my-2 " onClick={()=>updateNote(note)}>
                    <i className="fa-solid fa-pen"></i>
                </button>
                <button className="btn btn-dark my-2" onClick={()=>{deleteNote(note._id);props.showAlert("Delete suceessfully","success")}}>
                   <i className="fa-solid fa-trash"></i>
                </button>
                </div>
            </figure>
        
    )
}
export default NoteItem