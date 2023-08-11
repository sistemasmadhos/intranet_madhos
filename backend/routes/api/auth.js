const express = require("express");
const router = express.Router();
const db = require("../../database");
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

router.post("/", function(req, res){
    console.log('[post]login');
    // console.log(req.body);
    // var d = new Date();
    // console.log(d.getHours() + ' ' + d.getMinutes());
    //res.send('aa');
    db.select(['*']).from('intranet.usuarios')
    .where({user: req.body.user}).first().then(function(data) {
        if(data){
            let token = jwt.sign({user: data.user},'/CYF<g9PN`u:vz*%!)//', {expiresIn : '2h'});
            res.send({login: isValid(req.body.password, data.pass), token: token, rol: data.rol});
        } else 
            res.send({login: null, token: null, rol: null});
    });
})

function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

function isValid(password, hashedpassword){
    return  bcrypt.compareSync(password, hashedpassword);
}

function register(){
    console.log("register");
    db('intranet.usuarios').insert({user: 'yeison.mancilla', pass: hashPassword('123456'), area_id: 2})//.returning('*').toString()
    .then(function(data){
        res.status(200).json(data);
    })
    .catch(function(data){
        res.send(data)
    });
}


module.exports = router