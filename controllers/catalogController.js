const Catalog = require('../models/catalog')
const uuid = require('uuid');
exports.getCatalog = async function (req, res) {
    try{
        let page = parseInt(req.query.page, 10) || 1
        let perpage = parseInt(req.query.size) || 1000
        let tags;
        if(req.query.tags == "true" || req.query.tags == true){
            tags = [];
        }else{
            tags = req.query.tags? req.query.tags.split(',') : []
        }
        let result = await Catalog.getCatalog(page,perpage,tags);
        res.json(await Promise.all(result.data.map(async(e)=>{
            return {
                id: e.sock_id,
                name: e.name,
                description: e.description,
                imageUrl: [e.image_url_1,e.image_url_2],
                price: e.price,
                count: e.count,
                tag: (await Catalog.getTagOfCatalog(e.sock_id)).map(t => t.name)
            }
        })));
    } catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            err,
        })
    }
}

exports.getCatalogSize = async function (req, res) {
    try{
        let tags;
        if(req.query.tags == "true" || req.query.tags == true){
            tags = [];
        }else{
            tags = req.query.tags? req.query.tags.split(',') : []
        }
        let result = await Catalog.getCatalogSize(tags);
        res.json({
            size: result.length?result[0]['count(*)']:0
        });
    } catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            err,
        })
    }
}

exports.getCatalogById = async function (req, res) {
    try{
        let id = req.params.id;
        let e = await Catalog.getCatalogById(id);
        let tags = await Catalog.getTagOfCatalog(id);
        res.json({
            id: e.sock_id,
            name: e.name,
            description: e.description,
            imageUrl: [e.image_url_1,e.image_url_2],
            price: e.price,
            count: e.count,
            tag: tags.map(t => t.name)
        });
    } catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            err,
        })
    }
}

exports.getAllTag = async function (req, res) {
    try{
        let result = await Catalog.getAllTag();
        res.json({
            tags: result.map(e=>e.name),
            err: null,
        });
    } catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            err,
        })
    }
}

exports.createCatalog = async function (req, res) {
    try{
        req.body.id = uuid.v4();

        if(req.body.images){
            let fileName1 = uuid.v4() + '.jpg';
            let data1 = new Buffer(req.body.images[0],'base64');
            let fileName2 = uuid.v4() + '.jpg';
            let data2 = new Buffer(req.body.images[1],'base64');
            fs.writeFileSync("./public/"+fileName1,data1);
            fs.writeFileSync("./public/"+fileName2,data2);
            req.body.imageUrl = ['/catalogue/images/' + fileName1,'/catalogue/images/' + fileName2]
        }
        let result = await Catalog.createCatalog(req.body)
        res.json({
            success: true,
            id: req.body.id
        });
    } catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            err,
        })
    }
}

exports.editCatalog = async function (req, res) {
    try{
        if(req.body.image){
            let fileName1 = uuid.v4() + '.jpg';
            let data1 = new Buffer(req.body.images[0],'base64');
            let fileName2 = uuid.v4() + '.jpg';
            let data2 = new Buffer(req.body.images[1],'base64');
            fs.writeFileSync("./public/"+fileName1,data1);
            fs.writeFileSync("./public/"+fileName2,data2);
            req.body.imageUrl = ['/catalogue/images/' + fileName1,'/catalogue/images/' + fileName2]
        }
        let result = await Catalog.editCatalog(req.body,req.params.id)
        res.json({
            success: true,
            result
        });
    } catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            err,
        })
    }
}

exports.deleteCatalog = async function (req, res) {
    try{
        let result = await Catalog.deleteCatalog(req.params.id)
        res.json({
            success: true,
            result
        });
    } catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            err,
        })
    }
}

exports.getAllTagDetail =  async function (req, res) {
    try{
        let result = await Catalog.getAllTag();
        res.json(result);
    } catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            err,
        })
    }
}

exports.createTag = async function (req, res) {
    try{
        let result = await Catalog.createTag(req.body)
        res.json({
            success: true,
            result
        });
    } catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            err,
        })
    }
}

exports.editTag = async function (req, res) {
    try{
        let result = await Catalog.editTag(req.body,req.params.id)
        res.json({
            success: true,
            result
        });
    } catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            err,
        })
    }
}

exports.deleteTag = async function (req, res) {
    try{
        let result = await Catalog.deleteTag(req.params.id)
        res.json({
            success: true,
            result
        });
    } catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            err,
        })
    }
}

exports.createTagCatalog = async function (req, res) {
    try{
        let result = await Catalog.addTagCatalog(req.body.tagId,req.body.catalogId);
        res.json({
            success: true,
            result
        });
    } catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            err,
        })
    }
}

exports.deleteTagCatalog = async function (req, res) {
    try{
        let result = await Catalog.deleteTagCatalog(req.body.tagId,req.body.catalogId)
        res.json({
            success: true,
            result
        });
    } catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            err,
        })
    }
}

const fs = require('fs');

exports.uploadImage = async function (req, res) {
    try{
        let fileName = uuid.v4() + '.jpg';
        let data = new Buffer(req.body.data,'base64');
        fs.writeFileSync("./public/"+fileName,data);
        res.json({
            success: true,
            fileName,
        });
    } catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            err,
        })
    }
}