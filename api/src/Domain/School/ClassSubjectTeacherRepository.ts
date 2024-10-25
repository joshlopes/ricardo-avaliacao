import { type ClassSubjectTeacherId } from './ClassSubjectTeacherId'
import type ClassSubjectTeacher from './ClassSubjectTeacher'
import { type TeacherId } from '../Teacher/TeacherId'

export default interface ClassSubjectTeacherRepository {
  /**
     * @throws RecordNotFound
     */
  get: (id: ClassSubjectTeacherId) => Promise<ClassSubjectTeacher>

  upsert: (classSubjectTeacher: ClassSubjectTeacher) => Promise<ClassSubjectTeacher>

  delete: (id: ClassSubjectTeacherId) => Promise<void>

  findAll: () => Promise<ClassSubjectTeacher[]>

  findByTeacher: (teacherId: TeacherId) => Promise<ClassSubjectTeacher[]>
}
