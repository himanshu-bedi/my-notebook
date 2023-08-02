const express = require("express");
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//Route 1:get all notes of user logged in 
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal error occured")
    }

})

//Route 2:add all notes using post of user logged in 
router.post('/addnote', fetchuser,
    [
        body('title', 'Enter a valid title').isLength({ min: 3 }),
        body('description', 'Description must be at least 5 character').isLength({ min: 5 })

    ]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { title, description, tag } = req.body
            // console.log(req.user.id)
            const note = new Notes(
                {
                    title,
                    description,
                    tag,
                    user: req.user.id
                }
            )
            // console.log(note)
            const saveNote = await note.save();
            res.json(saveNote)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Internal error occured")
        }


    })

//Route 3:update  notes using put of user logged in using id of the note
router.put('/updatenote/:id', fetchuser,
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const newNote = {}
            if (title) {
                newNote.title = title
            }
            if (description) {
                newNote.description = description
            }
            if (tag) {
                newNote.tag = tag
            }
            //find note to be updated and update
            let note = await Notes.findById(req.params.id);
            if (!note) {
                return res.status(404).send("Not Found")
            }
            // console.log(req.params.id,note.user)
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not allowed")
            }
    
            //now update the note with newNote
            
            note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
            res.json({note})
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Internal error occured")
        }
        

    })
//Route 3:delete  note using put of user logged in using id of the note
router.delete('/deletenote/:id', fetchuser,
    async (req, res) => {
    
        try {
            let note = await Notes.findById(req.params.id);
            if (!note) {
                return res.status(404).send("Not Found")
            }
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not allowed")
            }
            // console.log(req.params.id,note.user)
    
    
            //now update the note with newNote
            
            note=await Notes.findByIdAndDelete(req.params.id)
            res.json({"Success":"Notes has been delete",note:note})
     
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Internal error occured")
        }
        //find note to be deleted and delete it
        
    })

module.exports = router