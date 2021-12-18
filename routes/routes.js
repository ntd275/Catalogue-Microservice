const catalogController = require('../controllers/catalogController')
const crypto = require('crypto')
module.exports = function (app) {
  app.get('/catalogue',catalogController.getCatalog)
  app.get('/catalogue/size',catalogController.getCatalogSize)
  app.get('/catalogue/:id', catalogController.getCatalogById)
  app.post('/catalogue',catalogController.createCatalog)
  app.put('/catalogue/:id',catalogController.editCatalog)
  app.delete('/catalogue/:id',catalogController.deleteCatalog)
  app.get('/tags',catalogController.getAllTag)
  app.get('/tags-all-detail',catalogController.getAllTagDetail)
  app.post('/tags',catalogController.createTag)
  app.put('/tags/:id',catalogController.editTag)
  app.delete('/tags/:id',catalogController.deleteTag)
  app.post('/tag-catalogue',catalogController.createTagCatalog)
  app.delete('/tag-catalogue',catalogController.deleteTagCatalog)

  app.use(function (req, res) {
    res.status(404).json({
      success: false,
      message: req.originalUrl + " not found",
    });
  });
};
