import CommandHandler from '../../../../Domain/Command/CommandHandler'
import ListAllUsersCommand from './ListAllUsersCommand'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../../../Infrastructure/DependencyInjection/types'
import TeacherRepository from '../../../../Domain/Teacher/TeacherRepository'
import Teacher from '../../../../Domain/Teacher/Teacher'

@injectable()
export default class ListAllUsersCommandHandler implements CommandHandler<ListAllUsersCommand> {
  constructor (
    @inject(TYPES.TeacherRepository) private readonly repository: TeacherRepository
  ) {}

  async handle (command: ListAllUsersCommand): Promise<Teacher[]> {
    return await this.repository.findAll()
  }
}
