module.exports = (sequelize, Sequelize) => {
    const Work = sequelize.define("work", {
        isApproveUser1: {
            type: Sequelize.BOOLEAN
        },
        isApproveUser2: {
            type: Sequelize.BOOLEAN
        },
        isApproveUser3: {
            type: Sequelize.BOOLEAN
        },
    });
    return Work;
  };
  