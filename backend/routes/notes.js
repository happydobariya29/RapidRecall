const express = require('express');
const router = express.Router();
const User = require('../models/User');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Notes');
const { query, validationResult, body } = require('express-validator');

// Route 01 :Get All the Notes using: GET "/api/notes/fetchallnotes". login required
router.get('/fetchallnotes',fetchuser, async (req, res)=>{
    try {
    const notes = await Note.find({user: req.user.id});
    res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error ");
    }
})

// Route 02 :Add a new Notes using: POST "/api/notes/addnotes". login required
router.post('/addnotes',fetchuser,[
    body('title', 'Enter a valid title').isLength({min: 3}),
    body('description', 'Description must be at least 5 characters').isLength({min: 5})
], async (req, res)=>{

    try {

    const { title,description,tag } = req.body;
    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()});
    }
    
    const note = new Note({
        title, description, tag, user: req.user.id
    });
    const savedNote = await note.save()
    res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error ");
    }
    })

    // Route 03 :Update an existing Notes using: PUT "/api/notes/updatenotes". login required
    router.put('/updatenotes/:id',fetchuser, async (req, res)=>{
        try {
        const {title, description, tag} = req.body;
        //Create a new note object
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send ("Not Found")}

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.json({note});
                
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error ");
        }
    })

    // Route 04 :Delete an existing Notes using: DELETE "/api/notes/deletenotes". login required
    router.delete('/deletenotes/:id',fetchuser,async (req,res)=>{
        try {
        const {title, description, tag} = req.body;

        //Find the note to be delete and delete it
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send ("Not Found")}

        //Allow deletion only if user owns this

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success": "Note has been deleted !!", note:note});

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error ");
        }
    })

module.exports = router