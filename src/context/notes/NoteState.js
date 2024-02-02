import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
    const notesInitial = [
        {
          "_id": "65ba988de4c636b1eb0a8fcb",
          "user": "65b0010e22735a67c56c881e",
          "title": "My Title",
          "description": "Please Wake up Early at least at 6'o clock !!",
          "tag": "Personal",
          "date": "2024-01-31T18:59:25.776Z",
          "__v": 0
        },
        {
          "_id": "65bca314f1cdfaf81fc3b714",
          "user": "65b0010e22735a67c56c881e",
          "title": "My Title",
          "description": "Please Wake up Early at least at 16'o clock!!",
          "tag": "Personal use only",
          "date": "2024-02-02T08:08:52.117Z",
          "__v": 0
        },
        {
          "_id": "65bca352f1cdfaf81fc3b71a",
          "user": "65b0010e22735a67c56c881e",
          "title": "My Title",
          "description": "Please Wake up Early at least at 16'o cloock!!",
          "tag": "Personal use only",
          "date": "2024-02-02T08:09:54.249Z",
          "__v": 0
        }
      ]

      const [notes, setNotes] = useState(notesInitial)

    return(
        <NoteContext.Provider value = {{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;