const Note = require('../db').Note;

const archiveNote = async (req, res) => {
    const id = parseInt(req.params.id);

    if (!id || isNaN(id)) {
        return res.status(400).send('ID must be a valid number');
    }

    try {
        const note = await Note.findByPk(id);
        if (!note) {
            return res.status(404).send('Note not found');
        }

        const tag = note.tag;

        note.archived = true;

        await note.save();

        res.status(200).json({ message: 'Note archived successfully', tag });
    } catch (error) {
        console.error('Error archiving note:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

module.exports = archiveNote;
