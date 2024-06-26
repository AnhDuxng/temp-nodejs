const { Author, Book } = require('../model/model');
const authorController = {
    // Add new author
    addAuthor: async (req, res) => {
        try{
            const newAuthor = new Author(req.body);
            const savedAuthor = await newAuthor.save();
            res.status(200).json(savedAuthor);
        } catch(err) {
            res.status(500).json(err); // http request code 
        }
    },

getAllAuthors: async (req, res) => {
    try{
        const authors = await Author.find();
        res.status(200).json(authors);
    } catch(err) {
        res.status(500).json(err); 
    }
},

// Get an author

getAnAuthor: async (req, res) => {
    try {
        const author = await Author.findById(req.params.id).populate("books");
        res.status(200).json(author);

    } catch (err) {
        res.status(500).json(err);
    }
},

// Update an author

updateAnAuthor: async (req, res) => {
    try {
        const author = await Author.findByIdAndUpdate(req.params.id);
        await author.updateOne({$set: req.body});
        res.status(200).json("Updated successfully");

    } catch (err) {
        res.status(500).json(err);
    }
}, 

// Delete an author
deleteAuthor: async (req, res) => {
    try{
    await Book.updateMany(
        {author: req.params.id}, 
        {author: null});
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json("Delete sucessfully");
    } catch (err) {
        res.status(500).json(err);
    }
}
};
module.exports = authorController;