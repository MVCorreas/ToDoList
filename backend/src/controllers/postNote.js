const Note = require('../db').Note;

const postNote = async (req, res) => {
    try {
        const { title, content, tag } = req.body;

        if (!title || !content || !tag) {
            return res.status(400).json({ error: 'Please specify details for this note' });
        }
      
        const newNote = await Note.create({
            title,
            content,
            tag,
            archived: false,
        });

        res.status(201).json(newNote);
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = postNote;
