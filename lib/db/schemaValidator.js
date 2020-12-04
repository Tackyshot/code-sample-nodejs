const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const schemaValidator = (schema, data) => {
  const validator = ajv.compile(schema);
  const isValid = validator(data);
  if (!isValid) throw Error(validator.errors[0].message);
  return true;
};

module.exports = schemaValidator;