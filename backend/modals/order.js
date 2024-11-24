const mongoose = require("mongoose");

const order = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'books',
    },
    status: {
        type: String,
        default: "Order Placed",
        enum: ["Order Placed", "Out for delivery", "Order Delivered", "Canceled"],
    }
},{ timestamps: true });

module.exports = mongoose.model("order", order);