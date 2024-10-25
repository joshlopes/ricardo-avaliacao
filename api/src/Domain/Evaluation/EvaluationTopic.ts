import { EvaluationTopicId } from './EvaluationTopicId'
import EvaluationSubTopic, { type EvaluationSubTopicArray } from './EvaluationSubTopic'
import EvaluationCategory, { type EvaluationCategoryArray } from './EvaluationCategory'

export interface EvaluationTopicArray {
  id: string
  name: string
  EvaluationCategory: EvaluationCategoryArray
  subtopics?: EvaluationSubTopicArray[]
}

export default class EvaluationTopic {
  constructor (
    public id: EvaluationTopicId,
    public name: string,
    public evaluationCategory: EvaluationCategory,
    public subtopics?: EvaluationSubTopic[],
  ) {}

  public static fromObject (object: EvaluationTopicArray): EvaluationTopic {
    return new EvaluationTopic(
      EvaluationTopicId.fromString(object.id),
      object.name,
      EvaluationCategory.fromObject(object.EvaluationCategory),
      object.subtopics ? object.subtopics.map(subtopic => EvaluationSubTopic.fromObject(subtopic)) : undefined,
    )
  }

  public toObject (): EvaluationTopicArray {
    return {
      id: this.id.toString(),
      name: this.name,
      EvaluationCategory: this.evaluationCategory.toObject(),
      subtopics: this.subtopics ? this.subtopics.map(subtopic => subtopic.toObject()) : undefined,
    }
  }
}
