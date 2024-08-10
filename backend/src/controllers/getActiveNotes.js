const Note = require('../db').Note;

const getActiveNotes = async (req, res) => {
    try {
        const notes = await Note.findAll(); 

        res.status(200).json(notes);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

module.exports = getActiveNotes;