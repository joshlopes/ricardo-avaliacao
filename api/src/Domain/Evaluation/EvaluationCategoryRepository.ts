import { type SubjectId } from '../School/SubjectId'
import { type EvaluationCategoryId } from './EvaluationCategoryId'
import type EvaluationCategory from './EvaluationCategory'

export default interface EvaluationCategoryRepository {
  /**
     * @throws RecordNotFound
     */
  get: (id: EvaluationCategoryId) => Promise<EvaluationCategory>

  upsert: (evaluationCategory: EvaluationCategory) => Promise<EvaluationCategory>

  delete: (id: EvaluationCategoryId) => Promise<void>

  findAll: () => Promise<EvaluationCategory[]>

  findBySubjectAndYear: (subjectId: SubjectId, year: string) => Promise<EvaluationCategory[]>
}
