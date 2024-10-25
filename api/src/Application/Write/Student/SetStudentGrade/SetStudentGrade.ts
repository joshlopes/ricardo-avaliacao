import type Command from '../../../../Domain/Command/Command'
import { type StudentId } from '../../../../Domain/School/StudentId'
import {GradeEnum} from "../../../../Domain/School/Grade";
import {EvaluationSubTopicId} from "../../../../Domain/Evaluation/EvaluationSubTopicId";

export default class SetStudentGrade implements Command {
  constructor (
    public studentId: StudentId,
    public evaluationSubtopicId: EvaluationSubTopicId,
    public grade: GradeEnum
  ) {}
}
