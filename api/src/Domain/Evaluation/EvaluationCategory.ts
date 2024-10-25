import { EvaluationTopicId } from './EvaluationTopicId'
import Subject, { type SubjectArray } from '../School/Subject'
import EvaluationTopic, { type EvaluationTopicArray } from './EvaluationTopic'

export interface EvaluationCategoryArray {
  id: string
  name: string
  year: string
  Subject: SubjectArray
  EvaluationTopics?: EvaluationTopicArray[]
}

export default class EvaluationCategory {
  constructor (
    public id: EvaluationTopicId,
    public name: string,
    public year: string,
    public subject: Subject,
    public evaluationTopics?: EvaluationTopic[]
  ) {}

  public static fromObject (object: EvaluationCategoryArray): EvaluationCategory {
    return new EvaluationCategory(
      EvaluationTopicId.fromString(object.id),
      object.name,
      object.year,
      Subject.fromObject(object.Subject),
      object.EvaluationTopics !== undefined ? object.EvaluationTopics.map(topic => EvaluationTopic.fromObject(topic)) : undefined
    )
  }

  public toObject (): EvaluationCategoryArray {
    return {
      id: this.id.toString(),
      name: this.name,
      year: this.year,
      Subject: this.subject.toObject(),
      EvaluationTopics: this.evaluationTopics !== undefined ? this.evaluationTopics.map(topic => topic.toObject()) : undefined
    }
  }
}
