const express = require('express')
const router = express.Router()
const UserController = require('../Controllers/UserControllers')



router.post('/showResult' ,  UserController.ShowResult )
router.post('/add-user'  , UserController.AddUser)
router.post('/login-user'  , UserController.login)
router.post('/send_otp'  , UserController.Send_OTP)
router.post('/verify_otp'  , UserController.Verify_otp)
router.get('/get-all-products'  , UserController.GetAllProduct)
router.post('/add-to-cart'  , UserController.addToCart)
router.get('/get-my-cart'  , UserController.getCartItems)
router.get('/get-my-cart-details'  , UserController.getDtailedCart)
router.post('/modify-quantity'  , UserController.handleQauantity)
router.get('/check-address'  , UserController.checkAddress)
router.post('/add-address'  , UserController.addAddress)
router.get('/get-user-addresses'  , UserController.getallAddress)
router.post('/purchase_order'  , UserController.purchaseOrder , UserController.do_payment   )
router.get('/getorders'  , UserController.getAllOrders)
router.post("/payment", UserController.do_payment );
router.post("/payment_process",   UserController.process_payemnt);
router.post("/getPaymetDetaisByID" , UserController.getPaymentDetailsByOrderId)
router.get('/get-my-profile') 






module.exports = router