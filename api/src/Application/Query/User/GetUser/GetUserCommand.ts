import type Command from '../../../../Domain/Command/Command'
import { type TeacherId } from '../../../../Domain/Teacher/TeacherId'

export default class GetUserCommand implements Command {
  constructor (public id: TeacherId) {}
}
