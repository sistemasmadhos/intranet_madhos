const express = require("express");
const router = express.Router();
const db = require("../../database");
const verify = require("./verify");

router.get("", function(req, res){
    db.select(['id','titulo'])
    .from('intranet.cabecera')
    .then(function(data){
        res.send(data)
    })
})
module.exports = router