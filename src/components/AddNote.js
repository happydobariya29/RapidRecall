import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';
const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title:"", description:"", tag:""})
    const handleClick = (e)=>{
        console.log("Adding A new note !");
            e.preventDefault();
            addNote(note.title, note.description,note.tag);
            props.showAlert("New Note Added Successfully", "success");
            setNote({title:"", description:"", tag:""})
    }
    const onChange = (e)=>{
        setNote({...note, [e.target.name]:e.target.value})
    }
    return (
        <div>
        <h1 className='mt-3'>HEY ,HAPPY !!</h1>
            <div className="container width my-3">
                <h2 className='hey mt-3'>ADD A NOTE !</h2>
                <form className="my-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control borderx" placeholder='Enter Your Notes Title Here' value={note.title} id="title" name="title" aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control borderx" placeholder='Enter Your Notes Description Here' value={note.description} id="description" name="description" onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control borderx" placeholder='Enter Your Notes Tag Here' value={note.tag} id="tag" name="tag" onChange={onChange} />
                    </div>
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-dark my-3 form-label" onClick={handleClick}>ADD NOTE</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
