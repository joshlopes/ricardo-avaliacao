import { type SubjectId } from './SubjectId'
import type Subject from './Subject'

export default interface SubjectRepository {
  /**
     * @throws RecordNotFound
     */
  get: (id: SubjectId) => Promise<Subject>

  upsert: (subject: Subject) => Promise<Subject>

  delete: (id: SubjectId) => Promise<void>

  findAll: () => Promise<Subject[]>
}
