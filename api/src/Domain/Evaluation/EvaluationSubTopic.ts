import { EvaluationSubTopicId } from './EvaluationSubTopicId'
import EvaluationTopic, { type EvaluationTopicArray } from './EvaluationTopic'
import Grade, { type GradeArray } from '../School/Grade'

export interface EvaluationSubTopicArray {
  id: string
  name: string
  evaluationTopic?: EvaluationTopicArray
  grades?: GradeArray[]
  created_at?: Date | undefined
  updated_at?: Date | undefined
}

export default class EvaluationSubTopic {
  constructor (
    public id: EvaluationSubTopicId,
    public name: string,
    public evaluationTopic?: EvaluationTopic,
    public grades?: Grade[],
    public created_at?: Date | undefined,
    public updated_at?: Date | undefined
  ) {}

  public static fromObject (object: EvaluationSubTopicArray): EvaluationSubTopic {
    return new EvaluationSubTopic(
      EvaluationSubTopicId.fromString(object.id),
      object.name,
      object.evaluationTopic !== undefined ? EvaluationTopic.fromObject(object.evaluationTopic) : undefined,
      object.grades !== undefined ? object.grades.map(grade => Grade.fromObject(grade)) : undefined,
      object.created_at,
      object.updated_at
    )
  }

  public toObject (): EvaluationSubTopicArray {
    return {
      id: this.id.toString(),
      name: this.name,
      evaluationTopic: this.evaluationTopic !== undefined ? this.evaluationTopic.toObject() : undefined,
      grades: this.grades !== undefined ? this.grades.map(grade => grade.toObject()) : undefined,
      created_at: this.created_at,
      updated_at: this.updated_at
    }
  }
}
