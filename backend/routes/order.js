const router = require("express").Router();
const { authenticateToken } = require("./userAuth");
const Book = require("../modals/book");
const Order = require("../modals/order");
const User = require("../modals/user");


//place order
router.post("/placeorder", authenticateToken, async(req, res) => {
    try {
        const {id} = req.headers;
        const { order } = req.body;
        for(const orderData of order){
            const newOrder = new Order({ user:id, book:orderData._id});
            const orderDataFromDb = await newOrder.save();

            // saving order in user model
            await User.findByIdAndUpdate(id, {
                $push: { orders: orderDataFromDb._id }
            });
            //clearing cart
            await User.findByIdAndUpdate(id, {
                $pull: { cart: orderData._id }
                });
        }
        return res.json({
            status: "Success",
            message: "Order placed successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "An error occured"})
        
    }
});

// get order history of particular user
router.get("/orderhistory", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: { path: "book" },
        });

        const ordersData = userData.orders.reverse();
        return res.json({
            status: "Success",
            data: ordersData,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "An error occured"})
        
    }
});

//get all orders --admin
router.get("/allorders", authenticateToken, async (req, res) => {
    try {
        const userData = await Order.find().populate({
            path: "book",
        })
        .populate({
            path: "user",
        })
        .sort({ createdAt: -1});
        return res.json({
            status: "Success",
            data: userData,
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "An error occured"})
        
    }
});

// update order
router.put("/updateorderstatus/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        await Order.findByIdAndUpdate(id, { status: req.body.status });
        return res.json({ status: "Success", message: "Order status updated" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "An error occured"})
        
    }
})

 
module.exports = router;