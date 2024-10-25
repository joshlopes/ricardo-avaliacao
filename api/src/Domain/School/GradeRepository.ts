import { type GradeId } from './GradeId'
import type Grade from './Grade'
import { type StudentId } from './StudentId'
import { type SubjectId } from './SubjectId'
import { type EvaluationSubTopicId } from '../Evaluation/EvaluationSubTopicId'

export default interface GradeRepository {
  /**
     * @throws RecordNotFound
     */
  get: (id: GradeId) => Promise<Grade>

  upsert: (grade: Grade) => Promise<Grade>

  delete: (id: GradeId) => Promise<void>

  findAll: () => Promise<Grade[]>

  findBySubjectAndStudent: (studentId: StudentId, subjectId: SubjectId) => Promise<Grade[]>

  findByStudentAndSubtopic: (studentId: StudentId, evaluationSubtopicId: EvaluationSubTopicId) => Promise<Grade | null>
}
