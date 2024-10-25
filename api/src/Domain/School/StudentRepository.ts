import { type StudentId } from './StudentId'
import type Student from './Student'
import { type TeacherId } from '../Teacher/TeacherId'
import { type SchoolClassId } from './SchoolClassId'
import { type SubjectId } from './SubjectId'

export default interface StudentRepository {
  /**
     * @throws RecordNotFound
     */
  get: (id: StudentId) => Promise<Student>

  upsert: (student: Student) => Promise<Student>

  delete: (id: StudentId) => Promise<void>

  findAll: () => Promise<Student[]>

  findByTeacher: (teacherId: TeacherId, schoolClassId?: SchoolClassId, subjectId?: SubjectId) => Promise<Student[]>
}
