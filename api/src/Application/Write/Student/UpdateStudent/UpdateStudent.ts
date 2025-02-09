import type Command from '../../../../Domain/Command/Command'
import { type StudentId } from '../../../../Domain/School/StudentId'

export default class UpdateStudent implements Command {
  constructor (
    public readonly id: StudentId,
    public readonly name: string
  ) {}
}
