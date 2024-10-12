import { inject, injectable } from 'inversify'
import GetUserCommand from './GetUserCommand'
import { TYPES } from '../../../../Infrastructure/DependencyInjection/types'
import CommandHandler from '../../../../Domain/Command/CommandHandler'
import TeacherRepository from '../../../../Domain/Teacher/TeacherRepository'
import Teacher from '../../../../Domain/Teacher/Teacher'

@injectable()
export default class GetUserCommandHandler implements CommandHandler<GetUserCommand> {
  constructor (
    @inject(TYPES.TeacherRepository) private readonly repository: TeacherRepository
  ) {}

  async handle (command: GetUserCommand): Promise<Teacher> {
    return await this.repository.get(command.id)
  }
}
