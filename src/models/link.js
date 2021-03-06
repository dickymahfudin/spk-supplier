'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class link extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user, {
        foreignKey: 'user_id',
        as: 'user',
      });
      this.belongsTo(models.criteria, {
        foreignKey: 'criteria_id',
        as: 'criteria',
      });
      this.belongsTo(models.supplier, {
        foreignKey: 'supplier_id',
        as: 'supplier',
      });
    }

    static async getAll(where = []) {
      const exclude = ['password', 'createdAt', 'updatedAt'];
      return await this.findAll({
        where,
        include: [
          { model: sequelize.models.user, as: 'user', attributes: { exclude } },
          {
            model: sequelize.models.criteria,
            as: 'criteria',
            attributes: { exclude },
          },
          {
            model: sequelize.models.supplier,
            as: 'supplier',
            attributes: { exclude },
          },
        ],
        attributes: { exclude },
        order: [['id', 'ASC']],
        // group: ["supplier_id"],
      })
        .then(result => result)
        .catch(err => {
          console.log(err);
          return err;
        });
    }
  }
  link.init(
    {
      user_id: DataTypes.INTEGER,
      criteria_id: DataTypes.INTEGER,
      supplier_id: DataTypes.INTEGER,
      value: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'link',
    }
  );
  return link;
};
