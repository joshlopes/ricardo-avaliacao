import type Command from '../../../../Domain/Command/Command'
import { type StudentId } from '../../../../Domain/School/StudentId'
import { type GradeEnum } from '../../../../Domain/School/Grade'
import { type EvaluationSubTopicId } from '../../../../Domain/Evaluation/EvaluationSubTopicId'

export default class SetStudentGrade implements Command {
  constructor (
    public studentId: StudentId,
    public evaluationSubtopicId: EvaluationSubTopicId,
    public grade: GradeEnum
  ) {}
}
