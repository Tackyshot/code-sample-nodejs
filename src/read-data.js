const { SchoolStudent } = require("../lib/db");

/**
 * The entry point into the lambda
 *
 * @param {Object} event
 * @param {string} event.schoolId
 * @param {string} event.studentId
 * @param {string} [event.studentLastName]
 */
exports.handler = async (event) => {

  if (event.studentId && event.schoolId) {
    try {
      return await SchoolStudent.GetByStudentIdAndSchoolId(event.studentId, event.schoolId);
    }
    catch (e){
      throw e;
    }
  }
  else if (event.studentLastName) {
    try {
      return await SchoolStudent.GetByStudentLastName(event.studentLastName);
    }
    catch (e){
      throw e;
    }
  }
  else if (event.schoolId) {
    try {
      return  await SchoolStudent.GetBySchoolId(event.schoolId);
    }
    catch (e) {
      throw e;
    }
  }
  else throw Error(`Event parameters missing required fields: ${event}`);

};