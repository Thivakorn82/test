module.exports = app => {
    const work = require("../controllers/work.controller.js");
  
    var router = require("express").Router();

    router.post("/createWork", work.create);
  
    app.use("/work", router);
};