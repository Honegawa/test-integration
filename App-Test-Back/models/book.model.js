export default (sequelize, DataType) => {
  sequelize.define(
    "Book",
    {
      title: {
        type: DataType.STRING,
        allowNull: false,
      },
      publicationDate: {
        type: DataType.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
