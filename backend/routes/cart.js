const router = require("express").Router();
const User = require("../modals/user");
const {authenticateToken} = require("./userAuth");

// add book to cart
router.put("/addBookToCart", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookinCart = userData.cart.includes(bookid);
        if(isBookinCart){
            return res.json({status: "Success", message: "Book is already in your cart."});
        }
        await User.findByIdAndUpdate(id, {
            $push: {cart: bookid},
        });
         return res.json({
            status: "Success",
            message: "Book added to cart successfully",
         });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "An error occured"})
        
    }
})

// remove from cart 
router.put("/removeFromCart/:bookid", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.params;
        const {id} = req.headers;
        await User.findByIdAndUpdate(id, {
            $pull: {cart: bookid},
        })
        return res.json({
            status: "Success",
            message: "Book removed from cart successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "An error occured"})
        
    }
})

// get cart of a particular user
router.get("/getCart", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate("cart");
        const cart = userData.cart.reverse();
        return res.json({
            status: "Success",
            data: cart,
            });
            } catch (error) {
                console.log(error);
                return res.status(500).json({message: "An error occured"})
                }
})


module.exports = router;