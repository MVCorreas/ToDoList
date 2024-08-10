const Note = require('../db').Note;

// Define the controller function
const deleteNote = async (req, res) => {
    const id = parseInt(req.params.id);

    if (!id || isNaN(id)) {
        return res.status(400).send('ID must be a valid number');
    }

    try {
        await Note.destroy({
            where: { id: id }
        });
        
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

module.exports = deleteNote;
