import type Command from '../../../../Domain/Command/Command'
import {SubjectId} from "../../../../Domain/School/SubjectId";

export default class GetEvaluationTopicsCommand implements Command {
  constructor (
      public subjectId: SubjectId
  ) {}
}
