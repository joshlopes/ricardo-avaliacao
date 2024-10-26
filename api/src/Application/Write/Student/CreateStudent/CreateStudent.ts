import type Command from '../../../../Domain/Command/Command'
import { type SubjectId } from '../../../../Domain/School/SubjectId'
import { type SchoolClassId } from '../../../../Domain/School/SchoolClassId'
import { type StudentId } from '../../../../Domain/School/StudentId'

export default class CreateStudent implements Command {
  constructor (
    public readonly id: StudentId,
    public readonly schoolClassId: SchoolClassId,
    public readonly subjectId: SubjectId,
    public readonly name: string
  ) {}
}
