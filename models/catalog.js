const knex = require('./database')

exports.getCatalog = async(page,size,tags) => {
    if(tags.length == 0){
        return knex('sock')
        .select('sock_id', 'name', 'description', 'price','count','image_url_1','image_url_2')
        .paginate({ perPage: size, currentPage: page, isLengthAware: true });
    }

    return knex('sock')
    .join("sock_tag","sock_tag.sock_id","sock.sock_id")
    .join("tag","tag.tag_id","sock_tag.tag_id")
    .whereIn("tag.name",tags)
    .groupBy('sock.sock_id', 'sock.name', 'description', 'price','count','image_url_1','image_url_2')
    .select('sock.sock_id', 'sock.name', 'description', 'price','count','image_url_1','image_url_2')
    .paginate({ perPage: size, currentPage: page, isLengthAware: true });
}

exports.getCatalogSize = async(tags)=>{
    if(tags.length == 0){
        return knex('sock')
        .count();
    }

    return knex('sock')
    .join("sock_tag","sock_tag.sock_id","sock.sock_id")
    .join("tag","tag.tag_id","sock_tag.tag_id")
    .whereIn("tag.name",tags)
    .groupBy('sock.sock_id')
    .count();
}

exports.getCatalogById = (id) => {
    return knex('sock')
    .select('sock_id', 'name', 'description', 'price','count','image_url_1','image_url_2')
    .where('sock_id',id)
    .first();
}

exports.getAllTag = () => {
    return knex('tag').select('name','tag_id');
}

exports.getTagOfCatalog = (id) => {
    return knex('sock_tag')
    .join('tag','tag.tag_id','sock_tag.tag_id')
    .where('sock_id',id)
    .select('tag.name')
}

exports.createCatalog = async(catalog) =>{
    return knex('sock').insert({
        sock_id: catalog.id,
        name: catalog.name,
        description: catalog.description,
        price: catalog.price,
        image_url_1: catalog.imageUrl[0],
        image_url_2: catalog.imageUrl[1],
        count: catalog.count,
    });
}

exports.editCatalog = async(catalog, id) => {
    return knex('sock').where('sock_id',id).update({
        name: catalog.name,
        description: catalog.description,
        price: catalog.price,
        image_url_1: catalog.imageUrl[0],
        image_url_2: catalog.imageUrl[1],
        count: catalog.count,
    });
}

exports.deleteCatalog = async(id) => {
    return knex('sock').where('sock_id',id).del();
}

exports.createTag = async(tag) => {
    return knex('tag').insert({
        name: tag.name
    });
}

exports.editTag = async(tag,id)=>{
    return knex('tag').where('tag_id',id).update({
        name: tag.name
    });
}

exports.deleteTag = async(id)=>{
    return knex('tag').where('tag_id',id).del();
}

exports.addTagCatalog = async(tagId,catalogId)=>{
    return knex('sock_tag').insert({
        tag_id: tagId,
        sock_id: catalogId,
    })
}

exports.deleteTagCatalog = async(tagId,catalogId)=>{
    return knex('sock_tag')
    .where('tag_id',tagId)
    .where('sock_id',catalogId)
    .del()
}