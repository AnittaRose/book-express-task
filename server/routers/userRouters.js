const express = require('express');
const router = express.Router();
const userController = require('../controlllers/usercontroller');

router.post('/addbooks',userController.Create)
router.get('/getbooks',userController.items)
router.get('/single/:id',userController.value)
router.delete('/delete/:id',userController.del)
router.put('/update/:id',userController.edit)

module.exports = router