import type Command from '../../../../Domain/Command/Command'
import { type TeacherId } from '../../../../Domain/Teacher/TeacherId'

export default class UpsertTeacherCommand implements Command {
  constructor (
    public id: TeacherId,
    public email: string,
    public name: string,
    public rawPassword: string | null = null
  ) {}
}
