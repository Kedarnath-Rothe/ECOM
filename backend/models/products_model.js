const {Schema, model, Mongoose} = require('mongoose');

const productSchema = new Schema({
    productname : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true, 
    },
    image : {
        type : String,
    },
    details : {
        type : String,
        required : true
    },
    booked : {
        type : Boolean,
        default : false
    },

    cust_id : {
        type : String, 
        default : ""
    },

    cust_name : {
        type : String, 
        default : ""
    },

    cust_phone : {
        type : Number, 
        default : null
    },

    transaction_id : {
        type : String, 
        default : ""
    }

})
 
const Product = new model("Product", productSchema);

module.exports = Product;