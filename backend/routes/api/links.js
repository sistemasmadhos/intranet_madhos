const express = require("express");
const router = express.Router();
const db = require("../../database");
const verify = require("./verify");
var path = require('path');
const fs = require('fs')

router.get("",function(req, res){
    // var area = req.params.id;
    console.log('[GET]links/')
    db.select([])
    .from('intranet.enlaces')
    .where('sw_activo', '1')
    .orderBy('id')
    .then(function(data){
        res.send(data)
    })
})


router.get('/:file', function(req, res) {
    var file = req.params.file;
    console.log('[GET]links/' + file)
    var id = req.params.id;
    // console.log('file', file);
    res.sendFile(path.join(__dirname, '../../routes/imgs', file))
})

router.post("", function(req, res){
    return linkOperation(req, res, null);
});

function linkOperation(req, res, id){ 
    console.log('[POST]links/')
    var file = p1 = null;
    var filename = '';
    var pt =  'routes/imgs/';
    var where = "(enlace = '" + req.body.link + "'" + (id ? " AND id != " + id : '' ) + ") ";
    console.log('where', where);
    if(req.files){
        file = req.files.file;
        filename = file.name.trim();
        filename = 'link-' + filename; 
        where += "OR url = '" + filename + "' ";
        p1 = new Promise((resolve) => {
            console.log(filename);
            file.mv(pt + filename, function (err){
                console.log('epaaaaaaa', err);
                if(err)
                    return res.status(500).json({message:'Se presento un problema al subir la imagen'});
                else
                    resolve(filename);
            })  
        });
    } else {
        p1 = new Promise((resolve) => { resolve(''); });
    }
    db.select(['id'])
    .from('intranet.enlaces')
    .whereRaw(where).then(function(data){
        if(data.length)
            return res.status(500).json({message:'Ya existe la url.'});
        p1.then((filename) => {
            var data = {
                nombre: req.body.name,
                enlace: req.body.link,
                url: id && !filename ?  db.raw('??', ['url']) : filename ? filename : 'link-madhos.jpg' 
            }
            var query = db('intranet.enlaces');
            if(id){
                query.returning(db.raw('(select url from intranet.enlaces where id = ' + id + ')')).update(data).where('id', id);
            } else {
                query.returning('*').insert(data);
            }
            query.then(function(data){
                console.log('data', data);
                if(id && filename){
                    if(data[0] != 'link-madhos.jpg'){
                        try {
                            fs.unlinkSync(pt+ data[0]);
                        } catch(err) { console.log('unlinkSync', err); }
                    }

                }
                return res.status(200).json(data);
            })
            .catch(function(data){
                console.log('catch', data);
                try {
                    fs.unlinkSync(pt+ filename);
                } catch(err) { console.log('unlinkSync', err); }
                return res.status(500).json({message:'Se presento un problema al ' + (id ? 'editar' : 'registrar') + ' el documento'});
                
            });    
        });
    })
}


router.put("/:id",  function(req, res){
    var id = req.params.id;
    console.log('id', id);
    console.log('body', req.body);
    return linkOperation(req, res, id);
})

router.delete("/:id", verify.verifyToken,function(req, res){
    var id = req.params.id;
    console.log('[delete]links/' + id)
    // console.log(req.params.id);
    //res.send("data");
    db.select()
    .from('intranet.enlaces')
    .where('id', id).first().then(function(data){
        if(data){
            db('intranet.enlaces').update({
                sw_activo: '0'
            }).where('id', id).then(function(resp){
                var pt = 'routes/imgs/';
                fs.unlink(pt + data.url, (err) => {
                    if (err) { }
                })
                res.status(200).json({});
            })  
        } else {
            return res.status(404).json({message:'No se encontro el enlace'});
        }
    });
})

module.exports = router