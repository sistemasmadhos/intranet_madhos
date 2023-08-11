const express = require("express");
const router = express.Router();
const db = require("../../database");
const verify = require("./verify");
var path = require('path');
const fs = require('fs')



// router.get("/inside", verify.verifyToken,function(req, res){
//     var area = req.params.id;
//     db.select([])
//     .from('intranet.anuncios as docs')
//     .where('sw_interno', '1')
//     .where('sw_activo', '1')
//     .then(function(data){
//         res.send(data)
//     })
// })

router.get("", verify.verifyToken,function(req, res){
    // var area = req.params.id;
    console.log('[GET]anounces/')
    db.select([])
    .from('intranet.anuncios as docs')
    .where('sw_activo', '1')
    .orderBy('id')
    .then(function(data){
        res.send(data)
    })
})

// router.get("/outside", function(req, res){
//     var area = req.params.id;
//     db.select([])
//     .from('intranet.anuncios as docs')
//     .where('sw_interno', '0')
//     .where('sw_activo', '1')
//     .then(function(data){
//         res.send(data)
//     })
// })

router.get('/:file', function(req, res) {
    var file = req.params.file;
    console.log('[GET]anounces/' + file)
    var id = req.params.id;
    // console.log('file', file);
    res.sendFile(path.join(__dirname, '../../routes/imgs', file))
})

router.post("", function(req, res){ 
    console.log('[POST]anounces/')
    var file = req.files.file;
    var filename = file.name;
    // console.log('body', req.body); 
    // console.log('file', req.files)
    // console.log(file.name);
    db.select(['id'])
    .from('intranet.anuncios')
    .where('url', filename)
    .then(function(data){
        if(data.length)
            return res.status(500).json({message:'Ya existe este nombre de archivo'});
        if(req.files){
            var pt =  'routes/imgs/';
            file.mv(pt + filename, function (err){
                if(err){
                    return res.status(500).json({message:'Se presento un problema al subir el archivo'});
                } else {
                    db('intranet.anuncios').returning('*')
                    .insert({
                        titulo: req.body.title,
                        descripcion: req.body.description,
                        tipo: req.body.type,
                        intervalo: req.body.interval,
                        url: filename
                    }).then(function(data){
                        res.status(200).json(data);
                    })
                    .catch(function(data){
                        try {
                            fs.unlinkSync(pt+ filename);
                        } catch(err) { }
                        return res.status(500).json({message:'Se presento un problema al registrar el documento'});
                        
                    });    
                    
                }
            })
            

        } else 
            return res.status(500).json({message:'el documento es necesario'});
    })
    
    
})


// router.put("/:id",  function(req, res){
//     console.log('body', req.body);
//     var type = req.body.type == 'manuals' ? true : false;
//     var pt = 'routes/documentos/' + (type ? '' : req.body.areaId + '/');
//     var id = req.params.id;
    
//     db.select(['id'])
//     .from('intranet.documentos')
//     .where('codigo', req.body.codigo)
//     .whereNot('id', id)
//     .then(function(data){
//         if(data.length)
//             return res.status(500).json({message:'Ya existe un documento con el codigo introducido'});
//         let p1 = null;
//         if(req.files){
//             p1 = new Promise((resolve) => {
//                 var file = req.files.file;
//                 var filename = file.name;    
//                 console.log(filename);
//                 file.mv(pt + filename, function (err){
//                     console.log('epaaaaaaa');
//                     if(err)
//                         return res.status(500).json({message:'Se presento un problema al subir el documento'});
//                     else
//                         resolve(filename);
//                 })  
//             });
//         }  else 
//             p1 = new Promise((resolve) => { resolve(''); });

//         p1.then((filename) => {
//             var spt = req.body.archivo.split('.');
//             var ext = '.' + spt[spt.length-1];
//             db('intranet.documentos').update({
//                 ndocumento: req.body.nombre,
//                 codigo: req.body.codigo,
//                 url: filename ? filename : req.body.codigo + ext //db.raw('??', ['url'])
//             }).where('id', id).then(function(data){
//                 console.log('filename', filename);
//                 console.log('archivo', req.body.archivo);
//                 console.log('codigo', req.body.codigo + ext);
//                 if(filename && req.body.archivo != filename){
//                     fs.unlink(pt + req.body.archivo, (err) => { })
//                 } else if(!filename && req.body.archivo != req.body.codigo + ext){
//                     console.log('enteee aqui yo')
//                     fs.rename(pt + req.body.archivo, pt + req.body.codigo + ext, function(err) { console.log(err) });
//                 }
//                 res.status(200).json({});
//             }).catch(function(data){
//                 console.log('error',error);
//                 try {
//                     fs.unlinkSync(pt+ filename);
//                 } catch(err) { }
//                 return res.status(500).json({message:'Se presento un problema al editar el documento'});
                
//             })
//         });
//     })
// })

router.delete("/:id", verify.verifyToken,function(req, res){
    var id = req.params.id;
    console.log('[delete]anounces/' + id)
    // console.log(req.params.id);
    //res.send("data");
    db.select()
    .from('intranet.anuncios')
    .where('id', id).first().then(function(data){
        if(data){
            db('intranet.anuncios').update({
                sw_activo: '0'
            }).where('id', id).then(function(resp){
                var pt = 'routes/imgs/';
                fs.unlink(pt + data.url, (err) => {
                    if (err) { }
                })
                res.status(200).json({});
            })  
        } else {
            return res.status(404).json({message:'No se encontro el anuncio'});
        }
    });
})

module.exports = router