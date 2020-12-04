const SchoolStudent = require('./models/schoolStudent');
const DynamoDB = require('./dynamoDB');
const schemaValidator = require("./schemaValidator");

module.exports = {
  SchoolStudent,
  DynamoDB,
  schemaValidator,
}