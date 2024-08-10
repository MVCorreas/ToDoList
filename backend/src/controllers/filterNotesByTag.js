const Note = require('../db').Note;

const filterNotesByTag = async (req, res) => {
  const { tag } = req.params;

  try {
    const notes = await Note.findAll({ where: { tag } });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = filterNotesByTag;
