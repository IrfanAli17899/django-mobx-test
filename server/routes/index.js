exports = module.exports = function (app, mongoose) {
  require("./user")(app, mongoose)
  require("./ticket")(app, mongoose)
  require("./purchase")(app, mongoose)
}