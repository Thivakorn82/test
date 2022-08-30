const db = require("../models");
const Work = db.work;

function genId(max) {
    return Math.floor(Math.random() * max);
}

exports.create = async (req,res) =>{
  const work = {
    id:genId(10000),
    isApproveUser1:false,
    isApproveUser2:false,
    isApproveUser3:false,
  };

  Work.create(work)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message:err.message });
    });
}