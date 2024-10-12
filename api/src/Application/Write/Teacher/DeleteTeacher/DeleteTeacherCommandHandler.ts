import Command from '../../../../Domain/Command/Command'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../../../Infrastructure/DependencyInjection/types'
import DeleteTeacherCommand from './DeleteTeacherCommand'
import TeacherRepository from '../../../../Domain/Teacher/TeacherRepository'

@injectable()
export default class DeleteTeacherCommandHandler implements Command {
  constructor (
    @inject(TYPES.TeacherRepository) private readonly repository: TeacherRepository
  ) {}

  async handle (command: DeleteTeacherCommand): Promise<void> {
    await this.repository.delete(command.id)
  }
}
