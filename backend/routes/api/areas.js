const express = require("express");
const router = express.Router();
const db = require("../../database");
const verify = require("./verify");

router.get("/", verify.verifyToken,function(req, res){
    console.log('[get]areas/')
    // console.log("areas");
    //res.send("data");
    db.select(['id', 'nombre'])
    .from('intranet.areas')
    .then(function(data){
        res.send(data)
    })
})

module.exports = router