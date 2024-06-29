const express = new require('express');
const router = express.Router();
const wshcmController = require("./controllers/wshcmForms")

router.get('/',(req,res)=>{
    return res.json("API is working!..");
})

router.post("/wshcmForm/submitForm", wshcmController);

module.exports = router