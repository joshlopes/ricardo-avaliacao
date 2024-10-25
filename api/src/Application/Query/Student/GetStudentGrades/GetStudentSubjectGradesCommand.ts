import type Command from '../../../../Domain/Command/Command'
import {StudentId} from "../../../../Domain/School/StudentId";
import {SubjectId} from "../../../../Domain/School/SubjectId";

export default class GetStudentSubjectGradesCommand implements Command {
  constructor (
      public studentId: StudentId,
      public subjectId: SubjectId
  ) {}
}
