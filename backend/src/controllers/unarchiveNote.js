const Note = require('../db').Note;

const unarchiveNote = async (req, res) => {
    const id = parseInt(req.params.id);

    if (!id || isNaN(id)) {
        return res.status(400).send('ID must be a valid number');
    }

    try {
        const note = await Note.findByPk(id);
        if (!note) {
            return res.status(404).send('Note not found');
        }

        note.archived = false;

        // Restore the tag when unarchiving if it is provided
        if (req.body.tag) {
            note.tag = req.body.tag;
        }

        await note.save();

        res.status(200).json({ message: 'Note unarchived successfully' });
    } catch (error) {
        console.error('Error unarchiving note:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

module.exports = unarchiveNote;
