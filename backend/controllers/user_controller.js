

const User = require('../models/user_model');
const bcrypt = require('bcryptjs');

const Product = require('../models/products_model');

// *-----------------------------
//  Home Logic
// *-----------------------------

const home = async(req, res) => {
    try{
        res.status(200).send("wellcome...");
    }
    catch(error){
        console.log(error.message);
    }
}


// *-----------------------------
//  Registration Logic
// *-----------------------------

const register = async(req,res) => {
    try{  
        // console.log(req.body);
        const { username, email, phone, password } = req.body;

        const userExist = await User.findOne({email});

        const mobileExist = await User.findOne({phone});

        if(userExist){
            return res.status(400).json({message : "email already exist"});
        }

        if(mobileExist){
            return res.status(400).json({message : "Mobile number already exist"});
        }

        //Hash the password
        const saltRound = 10;
        const hash_password = await bcrypt.hash(password, saltRound);

        let image = req.file ? req.file.filename : 'user.png'; // Set default image here
        const userCreated = await User.create({ username, email, phone, image, password:hash_password })

        res.status(200).json( { message : "Registration Successful", 
                                token : await userCreated.generateToken(),                                              //Token for authentification
                                userId:userCreated._id.toString()
                            })
    }
    catch(error){
        console.log(error);
        res.status(500).json('Internal server error');
    }
}


// *-----------------------------
//  Login Logic
// *-----------------------------

const login = async (req, res) =>{
    try{
        const {email, password} = req.body;

        const userExist = await User.findOne({email});

        if(!userExist){
            return res.status(400).json({message : "Invalid Credintials"});
        }

        const user = await bcrypt.compare(password, userExist.password);          //check valid password

        if(user){
            res.status(200).json( { message : "Login Successful", 
                                token : await userExist.generateToken(),                                              //Token for authentification
                                userId:userExist._id.toString()
                            })
        }
        else{
            res.status(401).json({message : "Invalid Credintial"});
        }

    }
    catch(error){
        res.status(500).json("internal server error")
    }
}

// *-----------------------------
//  User Logic-To send user Data
// *-----------------------------

const user = async (req, res) => {
    try {
      // const userData = await User.find({});
      const userData = req.user;
    //   console.log(userData);
      return res.status(200).json({ userData });
    } catch (error) {
      console.log(` error from user route ${error.message}`);
    }
  };


  // *-------------------------------------------
// * Get All Products Logic
// *-------------------------------------------
const getProducts = async(req, res) => {
    try{
        const products = await Product.find( {}, { password : 0 } );

        if(!products || products.length === 0){
            return res.status(404).json({message : "No Products Found"});
        }

        return res.status(200).json(products);
    }
    catch(error){
        next(error);
    }

}

// *-------------------------------------------
// * Product Delete
// *-------------------------------------------
const deleteProductById = async(req, res) => {
    try{
        const id = req.params.id;
        await Product.deleteOne({_id : id});
        return res.status(200).json({message : "Product deleted Successfully..."});
    }
    catch(error){
        next(error);
    }
}

// *-------------------------------------------
// * Single Uder Logic
// *-------------------------------------------
const updateUserById = async(req, res) => {
    try{
        const id = req.params.id;
        const updateUserData = req.body;

        const updateData = await User.updateOne(
            {_id : id},
            {$set : updateUserData}
        );

        return res.status(200).json(updateData);
    }
    catch(error){
        next(error);
    }
}


// *-------------------------------------------
// * Single Product Logic
// *-------------------------------------------
const getProductByID = async(req, res) => {
    try{
        const id = req.params.id;
        console.log(id);
        const data = await Product.findOne({_id : id}, {password : 0});
        return res.status(200).json(data);
    }
    catch(error){
        console.log(error.message);
    }
}

// *-------------------------------------------
// * Book Product Logic
// *-------------------------------------------
const bookProduct = async(req, res) => {
    try{
        const id = req.params.id;
        const updateUserData = req.body;

        const updateData = await Product.updateOne(
            {_id : id},
            {$set : updateUserData}
        );

        return res.status(200).json(updateData);
    }
    catch(error){
        next(error);
    }
}
 


module.exports = {
                home,
                register,
                login,
                user,
                getProducts,
                deleteProductById,
                updateUserById, 
                bookProduct,
                getProductByID,
            };