const router = require("express").Router();
const User = require("../modals/user");
const {authenticateToken} = require("./userAuth");

// add book to favourite
router.put("/addfavourite", authenticateToken, async (req, res) => {
    try {
        const { bookid, id} = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if(isBookFavourite){
            return res.status(200).json({message: "Book is already in your favourite list."
                });
        }
        await User.findByIdAndUpdate(id, {$push:{ favourites: bookid}});
        return res.status(200).json({message: "Book added to favourite list."});
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server error" });
        
    }
})

// remove book from favourite
router.put("/removefavourite", authenticateToken, async (req, res) => {
    try {
        const { bookid, id} = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if(isBookFavourite){
            await User.findByIdAndUpdate(id, {$pull:{ favourites: bookid}});    
        }
        return res.status(200).json({message: "Book removed from favourite list."});
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server error" });
        
    }
})

// get favourite books of a particular user
router.get("/getfavourite", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate("favourites");
        const favouriteBooks = userData.favourites;
        return res.json({
            status: "Success",
            data: favouriteBooks
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server error" });
    }
});
        


module.exports = router;
