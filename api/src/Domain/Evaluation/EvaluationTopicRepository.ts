import { type EvaluationTopicId } from './EvaluationTopicId'
import type EvaluationTopic from './EvaluationTopic'
import { type SubjectId } from '../School/SubjectId'

export default interface EvaluationTopicRepository {
  /**
     * @throws RecordNotFound
     */
  get: (id: EvaluationTopicId) => Promise<EvaluationTopic>

  upsert: (evaluationTopic: EvaluationTopic) => Promise<EvaluationTopic>

  delete: (id: EvaluationTopicId) => Promise<void>

  findAll: () => Promise<EvaluationTopic[]>

  findBySubjectAndYear: (subjectId: SubjectId, year: string) => Promise<EvaluationTopic[]>
}
