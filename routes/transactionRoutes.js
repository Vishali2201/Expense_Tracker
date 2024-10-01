const express=require('express');
const { addTransaction, getAllTransaction } = require('../controllers/transactionCtrl');


//router object
const router= express.Router();

//routes
//Add transactions POST Method
router.post('/add-transaction', addTransaction);

//Get transactions
router.post('/get-transaction', getAllTransaction);

module.exports = router;