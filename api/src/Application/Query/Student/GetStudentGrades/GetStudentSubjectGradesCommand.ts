import type Command from '../../../../Domain/Command/Command'
import { type StudentId } from '../../../../Domain/School/StudentId'
import { type SubjectId } from '../../../../Domain/School/SubjectId'

export default class GetStudentSubjectGradesCommand implements Command {
  constructor (
    public studentId: StudentId,
    public subjectId: SubjectId
  ) {}
}
