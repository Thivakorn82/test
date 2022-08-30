module.exports = app => {
    const data = require("../controllers/data.controller.js");
  
    var router = require("express").Router();

    router.get("/dataSplit", data.split);
  
    app.use("/data", router);
};