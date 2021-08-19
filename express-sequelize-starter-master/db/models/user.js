'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    username: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.prototype.validatePassword = function (password) {
    // Note that since this function is a model instance method,
    // `this` is the user instance here:
    return bcrypt.compareSync(password, this.password.toString());
};
  return User;
};
