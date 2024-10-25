import type Command from '../../../../Domain/Command/Command'
import { type TeacherId } from '../../../../Domain/Teacher/TeacherId'
import { type SchoolClassId } from '../../../../Domain/School/SchoolClassId'
import { type SubjectId } from '../../../../Domain/School/SubjectId'

export default class ListAllTeacherStudentsCommand implements Command {
  constructor (
    public teacherId: TeacherId,
    public schoolClassId?: SchoolClassId,
    public subjectId?: SubjectId
  ) {}
}
