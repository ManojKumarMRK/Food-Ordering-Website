//404 page not found compiler
exports.get404 = (req, res, next) => {
    res.status(404).json({"message" : "Page not found"});
};
  