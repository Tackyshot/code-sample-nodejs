const DynamoDB  = require('../dynamoDB');
const schemaValidator = require('../schemaValidator');

const tableName = 'SchoolStudents';
const studentLastNameGsiName = 'studentLastNameGsi';
const schoolStudentSchema = {
  "type": "object",
  "properties": {
    "studentId": { "type": "string" },
    "studentLastName": { "type": "string" },
    "studentGrade": { "type": "string" },
    "schoolName": { "type": "string" },
    "studentFirstName": { "type": "string" },
    "schoolId": { "type": "string" },
  },
  "required": ["studentId", "studentLastName", "studentGrade", "schoolName", "studentFirstName", "schoolId"],
};

const GetByStudentIdAndSchoolId = async (studentId, schoolId) => {
  try {
    const params = {
      TableName: tableName,
      KeyConditionExpression: "studentId = :studentId and schoolId = :schoolId",
      ExpressionAttributeValues: {
        ":studentId": studentId,
        ":schoolId": schoolId,
      },
    };
    const data = await DynamoDB.query(params);
    return data.Items;
  }
  catch (e) {
    throw e;
  }
}

const GetByStudentLastName = async (studentLastName) => {
  try {
    const params = {
      TableName: tableName,
      IndexName : studentLastNameGsiName,
      KeyConditionExpression: "studentLastName = :gsiPartitionKey",
      ExpressionAttributeValues: {
        ":gsiPartitionKey": studentLastName,
      },
    };
    const data = await DynamoDB.query(params);
    return data.Items;
  }
  catch (e) {
    throw e;
  }
}

const GetBySchoolId = async (schoolId) => {
  try {
    let toReturn = [];
    let data;
    let params = {
      TableName: tableName,
      Limit: '5',
      KeyConditionExpression: "schoolId = :partitionKey ",
      ExpressionAttributeValues: {
        ":partitionKey": schoolId,
      },
    };

    do {
      data = await DynamoDB.query(params);
      data.Items.forEach((item) => toReturn.push(item));
      params.ExclusiveStartKey  = data.LastEvaluatedKey;
    } while (data.LastEvaluatedKey);

    return toReturn;
  }
  catch (e) {
    throw e;
  }
}

const PutNewSchoolStudent = async (schoolStudent) => {
  try {
    schemaValidator(schoolStudentSchema, schoolStudent);
    const params = { TableName: tableName, Item: schoolStudent };
    return await DynamoDB.put(params);
  }
  catch (e) {
    throw e;
  }
};

module.exports = {
  tableName,
  studentLastNameGsiName,
  schoolStudentSchema,
  GetByStudentIdAndSchoolId,
  GetByStudentLastName,
  GetBySchoolId,
  PutNewSchoolStudent,
};