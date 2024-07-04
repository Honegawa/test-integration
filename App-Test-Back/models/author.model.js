export default (sequelize, DataType) => {
  sequelize.define(
    "Author",
    {
      firstname: {
        type: DataType.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataType.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
