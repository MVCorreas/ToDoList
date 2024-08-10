const Note = require('../db').Note;

const editNote = async (req, res) => {
    const { title, content, tag } = req.body;
    const id = parseInt(req.params.id);

    if (!title || !content || !tag) {
        return res.status(400).json({ error: 'Please specify details for this note' });
    }

    if (!id || isNaN(id)) {
        return res.status(400).send('ID must be a valid number');
    }

    try {
        const [rowsUpdated, [updatedNote]] = await Note.update(
            { title, content, tag },
            { where: { id }, returning: true }
        );
        
        if (rowsUpdated === 0) {
            return res.status(404).json({ success: false, message: 'Note not found' });
        }

        res.json(updatedNote);
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = editNote;
