
const Product = require('../models/products_model');


// ??AddProducts Post
const addproduct = async (req, res) => {
    try {
        // Destructure Product details from request body
        const { productname, price, username, phone, details, category } = req.body;

        if (phone.toString().length !== 10) {
            return res.status(400).json({ message: "Phone number must be exactly 10 digits" });
        }

        // Set default image if not provided in request
        let image = req.file ? req.file.filename : 'default_product_image.jpg';

        // Create new Product instance
        const productCreated = await Product.create({ productname, price, username, phone, details, image, category });

        // Return success response with Product details
        res.status(200).json({
            message: "Product added successful",
            product: productCreated
        });

    } catch (error) {
        console.log(error);
        res.status(500).json('Internal server error');
    }
}


const services = async(req, res) => {
    try{ 
        const response = await Product.find(); 
        if(!response) {
            res.status(404).json({message : "No service Found"})
            return;
        }  
        // console.log(response);
        // console.log(response);
        return res.status(200).json({msg : "service found", data : response})
    }
    catch(error){
        console.log(error.message); 
    }
}

const updateProducts = async (req, res) => {
    try {
        const { updatedProducts } = req.body;

        // Assuming updatedProducts is an array of Product objects
        await Promise.all(updatedProducts.map(async (updatedProduct) => {
            await Product.findByIdAndUpdate(updatedProduct._id, updatedProduct);
        }));

        res.status(200).json({ message: 'Products updated successfully' });
    } catch (error) {
        console.error('Error updating Products:', error);
        res.status(500).json({ error: 'An error occurred while updating Products' });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;

        // Find the Product by ID
        const product = await Product.findById(productId);

        // If Product not found, return 404
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Update Product schema to remove from cart
        product.cust_id = "";
        product.cust_name = "";
        product.booked = false;

        // Save the updated Product
        await product.save();

        res.status(200).json({ message: 'Product removed from cart successfully' });
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ error: 'An error occurred while removing from cart' });
    }
};

module.exports = {
    services,
    addproduct,
    updateProducts,
    removeFromCart
};