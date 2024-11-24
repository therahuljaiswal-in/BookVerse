const router = require("express").Router();
const User = require("../modals/user");
const jwt = require("jsonwebtoken");
const Book = require("../modals/book");
const { authenticateToken } = require("./userAuth");

//add book --admin
router.post("/addbook", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res
        .status(401)
        .json({ message: "You are not authorized to perform this action " });
    }
    const book = new Book({
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });
    await book.save();
    res.status(200).json({ message: "Book Added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// update book
router.put("/updatebook", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers;
    await Book.findByIdAndUpdate(bookid, {
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });
    res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occured" });
  }
});

// delete book
router.delete("/deletebook", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers;
    await Book.findByIdAndDelete(bookid);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occured" });
  }
});

// get all books
router.get("/getallbooks", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.json({
      status: "success",
      data: books,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occured" });
  }
});

// get recently added books limit to 4
router.get("/getrecentbooks", async (req, res) => {
    try {
      const books = await Book.find().sort({ createdAt: -1 }).limit(8);
      return res.json({
        status: "success",
        data: books,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "An error occured" });
    }
  });

  // get book by id
  router.get("/getbookbyid/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.json({
            status: "success",
            data: book,
        });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "An error occured" });
    }
  })

module.exports = router;
