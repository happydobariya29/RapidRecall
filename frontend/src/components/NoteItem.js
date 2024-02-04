import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
const NoteItem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const { note,updateNote } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body" style={{backgroundColor: "#a0b5be"}}>
                    <h5 className="card-title">{note.title}
                    <i className="fa-solid fa-trash mx-3" onClick={()=>{deleteNote(note._id);props.showAlert("Deleted Successfully", "success");}}></i>
                    <i className="fa-solid fa-pen-to-square mx-1" onClick={()=>{updateNote(note);}}></i></h5>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
