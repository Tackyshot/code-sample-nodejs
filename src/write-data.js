const { SchoolStudent } = require("../lib/db/index");
/**
 * The entry point into the lambda
 *
 * @param {Object} event
 * @param {string} event.schoolId
 * @param {string} event.schoolName
 * @param {string} event.studentId
 * @param {string} event.studentFirstName
 * @param {string} event.studentLastName
 * @param {string} event.studentGrade
 */
exports.handler = async ({ schoolId, schoolName, studentId, studentFirstName, studentLastName, studentGrade}) => {
  try {
    return await SchoolStudent.PutNewSchoolStudent({
      schoolId,
      schoolName,
      studentId,
      studentFirstName,
      studentLastName,
      studentGrade,
    });
  }
  catch (e){
    throw e;
  }
};