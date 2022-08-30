module.exports = app => {
    const user = require("../controllers/user.controller.js");
  
    var router = require("express").Router();

    router.post("/userApprove", user.userApprove);
  
    app.use("/user", router);
};