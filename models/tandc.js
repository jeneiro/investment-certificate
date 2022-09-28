module.exports = (Sequelize, DataTypes) => {
  const TandC = Sequelize.define("TandC", {
    item: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });
  return TandC;
};
