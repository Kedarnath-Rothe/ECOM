const express = require('express');
const controller = require('../controllers/admin_controller');
const authMiddleware = require('../middlewares/auth-middleware');

const router = express.Router();



router.route('/users').get(authMiddleware, controller.getAllUsers);

router.route('/users/:id').get(authMiddleware, controller.getUserById);

router.route('/users/update/:id').patch(authMiddleware, controller.updateUserById);

router.route('/users/delete/:id').delete(authMiddleware, controller.deleteUserById);

router.route('/contacts').get(authMiddleware, controller.getAllContacts);

router.route('/contacts/delete/:id').delete(authMiddleware, controller.deleteContactById);



router.route('/products').get(authMiddleware, controller.getAllProducts);

router.route('/products/:id').get(authMiddleware, controller.getProductById);

router.route('/products/update/:id').patch(authMiddleware, controller.updateProductById);

router.route('/products/delete/:id').delete(authMiddleware, controller.deleteProductById);

module.exports = router;