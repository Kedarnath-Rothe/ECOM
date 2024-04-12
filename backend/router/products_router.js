const express = require('express');
const controller = require('../controllers/products_controller');

const router = express.Router(); 

const multer = require("multer");                               //Upload Images
const path = require("path");

const storage = multer.diskStorage({
    destination : function(req , file , cb){
        cb(null, path.join(__dirname, '../../frontend/public/productimages'));
    },
    filename : function(req , file , cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null,name);
    }
})
const upload = multer({storage : storage});

router.route('/addproduct').get(controller.addproduct);

router.route('/addproduct').post(upload.single('image'), controller.addproduct);


router.route('/service').get(controller.services);  
router.post('/usercart', controller.updateProducts);
router.put('/products/:productId/', controller.removeFromCart);


module.exports = router;