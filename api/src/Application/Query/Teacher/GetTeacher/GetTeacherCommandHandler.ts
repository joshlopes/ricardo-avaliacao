import { inject, injectable } from 'inversify'
import GetTeacherCommand from './GetTeacherCommand'
import { TYPES } from '../../../../Infrastructure/DependencyInjection/types'
import CommandHandler from '../../../../Domain/Command/CommandHandler'
import TeacherRepository from '../../../../Domain/Teacher/TeacherRepository'
import Teacher from '../../../../Domain/Teacher/Teacher'

@injectable()
export default class GetTeacherCommandHandler implements CommandHandler<GetTeacherCommand> {
  constructor (
    @inject(TYPES.TeacherRepository) private readonly repository: TeacherRepository
  ) {}

  async handle (command: GetTeacherCommand): Promise<Teacher> {
    return await this.repository.get(command.id)
  }
}
