"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductTypeById = exports.updateProductTypeById = exports.getProductTypeById = exports.createProductType = exports.getAllProductTypes = void 0;
const databaseConnection_1 = require("../../config/databaseConnection");
const getAllProductTypes = async () => {
    const [rows] = await databaseConnection_1.db
        .promise()
        .query("SELECT * FROM ProductTypes");
    return rows;
};
exports.getAllProductTypes = getAllProductTypes;
const createProductType = async (name, weightage) => {
    await databaseConnection_1.db
        .promise()
        .query("INSERT INTO ProductTypes (Name, Weightage, Active) VALUES (?, ?, TRUE)", [name, weightage]);
};
exports.createProductType = createProductType;
const getProductTypeById = async (id) => {
    const [rows] = await databaseConnection_1.db
        .promise()
        .query("SELECT * FROM ProductTypes WHERE ProductTypeID = ?", [id]);
    return rows;
};
exports.getProductTypeById = getProductTypeById;
const updateProductTypeById = async (id, name, weightage) => {
    await databaseConnection_1.db
        .promise()
        .query("UPDATE ProductTypes SET Name = ?, Weightage = ? WHERE ProductTypeID = ?", [name, weightage, id]);
};
exports.updateProductTypeById = updateProductTypeById;
const deleteProductTypeById = async (id) => {
    await databaseConnection_1.db
        .promise()
        .query("DELETE FROM ProductTypes WHERE ProductTypeID = ?", [id]);
};
exports.deleteProductTypeById = deleteProductTypeById;
