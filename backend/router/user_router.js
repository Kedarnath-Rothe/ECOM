const express = require('express');

const router = express.Router();

const multer = require("multer");                               //Upload Images
const path = require("path");
require('dotenv').config();

const Controller = require('../controllers/user_controller');
const authMiddleware = require('../middlewares/auth-middleware');

const {signupSchema, loginSchema} = require('../validators/auth-validator');
const validate = require('../middlewares/validate-middleware');

const storage = multer.diskStorage({
    destination : function(req , file , cb){
        cb(null, path.join(__dirname, '../../frontend/public/userimages'));
    },
    filename : function(req , file , cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null,name);
    }
})
const upload = multer({storage : storage});

router.route('/').get(Controller.home)

router.route('/register').get(Controller.register)

router.route('/register').post(upload.single('image'), validate(signupSchema), Controller.register)

router.route('/login').post(validate(loginSchema), Controller.login)

router.route('/user').get( authMiddleware, Controller.user);

router.route('/manageproduct').get( authMiddleware, Controller.getProducts);

router.route('/manageproduct/delete/:id').delete(authMiddleware, Controller.deleteProductById);

router.route('/users/update/:id').patch(authMiddleware, Controller.updateUserById);


router.route('/bookproduct/:id').get(authMiddleware, Controller.getProductByID);
router.route('/bookproduct/update/:id').patch(authMiddleware, Controller.bookProduct);

module.exports = router;