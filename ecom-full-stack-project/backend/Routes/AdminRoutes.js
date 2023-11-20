const express = require('express')
const router = express.Router()
const AdminControllers = require('../Controllers/AdminControllers')

const uploads  = require('../Uploader/Upload')






router.post('/add-product' , uploads.uploadImages,  AdminControllers.addProduct)
router.post('/add-banner' , AdminControllers.addBanner )
router.get('/get-banners' , AdminControllers.getBanner )
router.get('/get-products' , AdminControllers.getAllProducts )
router.get('/search-products' , AdminControllers.SearchProducts )
router.get('/add-dummy-products' , AdminControllers.addDummyProducts )
router.post('/delete-products' , AdminControllers.deleteProduct )
router.post('/edit-products'   ,  uploads.uploadImages ,  AdminControllers.editProduct )
router.post('/api-2',uploads.uploadImages  , AdminControllers.showResult )
router.post('/try-jwt',AdminControllers.tryJwt )
router.post('/verify-jwt',AdminControllers.verifyJwt )




module.exports = router