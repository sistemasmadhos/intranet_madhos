const express = require("express");
const router = express.Router();
const db = require("../../database");
const verify = require("./verify");
var path = require('path');
const fs = require('fs')




// router.get("/", function(req, res){
//     var area = req.params.id;
//     console.log("running22");
//     //res.send("data");
//     db.select(['docs.id','docs.codigo','docs.ndocumento as titulo','docs.url','cab.id as cabecera_id','cab.titulo as cabecera_titulo'])
//     .from('intranet.documentos as docs')
//     .innerJoin('intranet.cabecera as cab', 'cab.id', 'docs.cabecera_id')
//     .then(function(data){
//         res.send(data)
//     })
// })

router.get("/docs/:id", verify.verifyToken,function(req, res){
    var area = req.params.id;
    console.log("[get]documentos/docs/"  + area);
    var cabeceraId = req.query.cabeceraId;
    // console.log("running33");
    // console.log(req.params.id);
    //res.send("data");
    var query = db.select(['docs.id','docs.codigo','docs.ndocumento as titulo','docs.url','docs.area_id','cab.id as cabecera_id','cab.titulo as cabecera_titulo'])
    .from('intranet.documentos as docs')
    .innerJoin('intranet.cabecera as cab', 'cab.id', 'docs.cabecera_id')
    .where('docs.area_id', area)
    .where('docs.sw_activo', '1');
    if(cabeceraId > 0)
        query.where('docs.cabecera_id', cabeceraId);

    query.then(function(data){
        res.send(data)
    })
})



router.get("/manuals/:id", verify.verifyToken,function(req, res){
    var area = req.params.id;
    console.log("[get]documentos/manuals/"  + area);
    db.select(['docs.id','docs.codigo','docs.ndocumento as titulo','docs.url','docs.area_id', db.raw("'0' as cabecera_id"), db.raw("'0' as cabecera_titulo")])
    .from('intranet.documentos as docs')
    .whereNull('docs.area_id')
    .where('sw_activo', '1')
    .whereNull('docs.cabecera_id').then(function(data){
        res.send(data)
    })
})

router.get('/:id/:file', function(req, res) {
    var file = req.params.file;
    var id = req.params.id;
    console.log("[get]documentos/manuals/"  + id + "/" + file);
    // console.log('file', file);
    res.sendFile(id != '0' ? path.join(__dirname, '../../routes/documentos', id, file) : path.join(__dirname, '../../routes/documentos', file))
})

router.post("", function(req, res){
    console.log("[get]documentos");
    // console.log('body', req.body); 
    // console.log(req.files);
    var type = req.body.type == 'manuals' ? true : false;
    db.select(['id'])
    .from('intranet.documentos')
    .where('codigo', req.body.codigo)
    .where('sw_activo', '1')
    .then(function(data){
        if(data.length)
            return res.status(500).json({message:'Ya existe un documento con el codigo introducido'});
        if(req.files){
            var file = req.files.file;
            var filename = file.name;
            var pt =  'routes/documentos/' + (type ? '' : req.body.areaId + '/');
            file.mv(pt + filename, function (err){
                if(err){
                    return res.status(500).json({message:'Se presento un problema al subir el archivo'});
                } else {
                    db('intranet.documentos').returning(['id'])
                    .insert({
                        ndocumento: req.body.nombre,
                        codigo: req.body.codigo,
                        area_id: type ? null : req.body.areaId ,
                        cabecera_id: type ? null : req.body.cabeceraId,
                        url: filename
                    }).then(function(data){
                        res.status(200).json({id: data[0].id, codigo: req.body.codigo, titulo: req.body.nombre, url: filename, area_id: type ? '0' : req.body.areaId,cabecera_id: type ? '0' : req.body.cabeceraId, cabecera_titulo: req.body.cabecera});
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


router.put("/:id",  function(req, res){
    // console.log('body', req.body);
    var type = req.body.type == 'manuals' ? true : false;
    var pt = 'routes/documentos/' + (type ? '' : req.body.areaId + '/');
    var id = req.params.id;
    console.log("[put]documentos/" + id);
    db.select(['id'])
    .from('intranet.documentos')
    .where('codigo', req.body.codigo)
    .whereNot('id', id)
    .then(function(data){
        if(data.length)
            return res.status(500).json({message:'Ya existe un documento con el codigo introducido'});
        let p1 = null;
        if(req.files){
            p1 = new Promise((resolve) => {
                var file = req.files.file;
                var filename = file.name;    
                // console.log(filename);
                file.mv(pt + filename, function (err){
                    if(err)
                        return res.status(500).json({message:'Se presento un problema al subir el documento'});
                    else
                        resolve(filename);
                })  
            });
        }  else 
            p1 = new Promise((resolve) => { resolve(''); });

        p1.then((filename) => {
            var spt = req.body.archivo.split('.');
            var ext = '.' + spt[spt.length-1];
            db('intranet.documentos').update({
                ndocumento: req.body.nombre,
                codigo: req.body.codigo,
                url: filename ? filename : req.body.codigo + ext //db.raw('??', ['url'])
            }).where('id', id).then(function(data){
                // console.log('filename', filename);
                // console.log('archivo', req.body.archivo);
                // console.log('codigo', req.body.codigo + ext);
                if(filename && req.body.archivo != filename){
                    fs.unlink(pt + req.body.archivo, (err) => { })
                } else if(!filename && req.body.archivo != req.body.codigo + ext){
                    fs.rename(pt + req.body.archivo, pt + req.body.codigo + ext, function(err) { console.log(err) });
                }
                res.status(200).json({});
            }).catch(function(data){
                console.log('error',error);
                try {
                    fs.unlinkSync(pt+ filename);
                } catch(err) { }
                return res.status(500).json({message:'Se presento un problema al editar el documento'});
                
            })
        });
    })
})

router.delete("/:id", verify.verifyToken,function(req, res){
    var id = req.params.id;
    console.log("[delete]documentos/" + id);
    // console.log(req.params.id);
    //res.send("data");
    db.select()
    .from('intranet.documentos')
    .where('id', id).first().then(function(data){
        if(data){
            db('intranet.documentos').update({
                sw_activo: '0'
            }).where('id', id).then(function(resp){
                var pt = 'routes/documentos/' + (data.area_id ? data.area_id + '/': '');
                fs.unlink(pt + data.url, (err) => {
                    if (err) { }
                })
                res.status(200).json({});
            })
        } else {
            return res.status(404).json({message:'No se encontro el documento'});
        }
    });
})


/*
router.post("/", function(req, res){
    console.log(req.body);
    //INSERT INTO tablename(col1, col2) VALUES (col1value, col2value);
//SELECT * FROM table WHERE id = inserted_row
    db.insert(req.body).returning(*).into("todo").then(function(data){
        res.send(data)
    })
})

router.put("/:id", function(req, res){
    console.log(req.params.id);
    //SELECT * FROM todo WHERE id = ourId
    db("todo").where({ id: req.params.id }).update(
{title:req.body.title || null, is_done: req.body.is_done || null}
).returning("*").then(function(data){
    res.send(data);
})
// if undefined it is going to skip and leave the value, so its better to set as nul if is undefined
})

router.delete("/:id", function(req, res){
    db("todo").where({id: req.params.id}).del().then(function(){
    res.json({success:true})
})
})*/

module.exports = router