module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      userId: {
        type: Sequelize.STRING
      },
      userName: {
        type: Sequelize.STRING
      },
      userPassword: {
        type: Sequelize.STRING
      },
    });
    return User;
  };
  