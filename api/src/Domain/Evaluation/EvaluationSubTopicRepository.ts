import { type EvaluationSubTopicId } from './EvaluationSubTopicId'
import type EvaluationSubTopic from './EvaluationSubTopic'

export default interface EvaluationSubTopicRepository {
  /**
     * @throws RecordNotFound
     */
  get: (id: EvaluationSubTopicId) => Promise<EvaluationSubTopic>

  upsert: (subTopic: EvaluationSubTopic) => Promise<EvaluationSubTopic>

  delete: (id: EvaluationSubTopicId) => Promise<void>

  findAll: () => Promise<EvaluationSubTopic[]>
}
