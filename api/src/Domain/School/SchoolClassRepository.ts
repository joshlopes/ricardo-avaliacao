import { type SchoolClassId } from './SchoolClassId'
import type SchoolClass from './SchoolClass'
import { type TeacherId } from '../Teacher/TeacherId'

export default interface SchoolClassRepository {
  /**
     * @throws RecordNotFound
     */
  get: (id: SchoolClassId) => Promise<SchoolClass>

  upsert: (schoolClass: SchoolClass) => Promise<SchoolClass>

  delete: (id: SchoolClassId) => Promise<void>

  findAll: () => Promise<SchoolClass[]>

  findByTeacher: (teacherId: TeacherId) => Promise<SchoolClass[]>
}
