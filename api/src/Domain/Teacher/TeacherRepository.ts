import type Teacher from './Teacher'
import { type TeacherId } from './TeacherId'

export default interface TeacherRepository {
  /**
     * @throws RecordNotFound
     */
  get: (id: TeacherId) => Promise<Teacher>

  /**
     * @throws RecordNotFound
     */
  getByEmail: (email: string) => Promise<Teacher>

  findByEmail: (email: string) => Promise<Teacher | null>

  upsert: (teacher: Teacher) => Promise<Teacher>

  delete: (id: TeacherId) => Promise<void>

  findAll: () => Promise<Teacher[]>
}
