const router = require('express').Router()
const regc = require('../controllers/regcontroller');
const productc = require('../controllers/productcontroller');
const verifyUser = require('../helper/JwtVerifyUser')
const upload = require('../helper/multer');

router.post('/reg', regc.register)
router.post('/login', regc.loginCheck)
router.get('/', (req, res) => {
  res.send("hello")
}
)
router.get('/allData', productc.allData)
router.post('/addData', upload.single('image'), productc.addFormData)
router.post('/category', productc.category)
router.get('/singleData/:id', productc.updateSingleData)
router.put('/updateProducts/:id', upload.single('img'), productc.updateProducts)
router.post('/delete/:id', productc.deleteProducts)
router.get('/produstInStock', productc.produstInStock)
router.post('/sortingList', productc.sortingList)
router.post('/cart', productc.cart)
router.post('/cartData/:userName', productc.cartData)
router.get('/myorders/:userName', productc.myOrders)


module.exports = router


