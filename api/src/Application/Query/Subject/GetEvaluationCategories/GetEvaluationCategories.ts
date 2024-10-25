import type Command from '../../../../Domain/Command/Command'
import { type SubjectId } from '../../../../Domain/School/SubjectId'

export default class GetEvaluationCategories implements Command {
  constructor (
    public subjectId: SubjectId,
    public year: string
  ) {}
}
