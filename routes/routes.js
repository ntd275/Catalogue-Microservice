module.exports = function (app) {
  app.use(function (req, res) {
    res.status(404).json({
      success: false,
      message: req.originalUrl + " not found",
    });
  });
};
