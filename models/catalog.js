const knex = require('./database')

exports.getCatalog = async(page,size,tags) => {
    let res = await knex('sock').select('sock_id', 'name', 'description', 'price','count','image_url_1','image_url_2').paginate({ perPage: size, currentPage: page, isLengthAware: true });
    console.log(res);
    if(tags.length > 0){
        tagsRes = await knex('sock_tag').join('tag', 'tag.tag_id', 'sock_tag.tag_id').whereIn('sock_id',res.map(x => x.sock_id)).whereIn('name',tags);
    } else {
        tagsRes = await knex('sock_tag').join('tag', 'tag.tag_id', 'sock_tag.tag_id').whereIn('sock_id',res.map(x => x.sock_id))
    }
}

exports.getCatalogById = async(id) => {
    return await knex('sock').select('sock_id', 'name', 'description', 'price','count','image_url_1','image_url_2').where('sock_id',id).first();
}

exports.catalogSize = async(tags,)=>{
    return await knex('sock').count();
}

exports.getTag = async() => {
    return await knex('tag').select('name');
}