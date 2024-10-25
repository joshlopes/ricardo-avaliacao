import CommandHandler from '../../../../Domain/Command/CommandHandler'
import ListAllTeachersCommand from './ListAllTeachersCommand'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../../../Infrastructure/DependencyInjection/types'
import TeacherRepository from '../../../../Domain/Teacher/TeacherRepository'
import Teacher from '../../../../Domain/Teacher/Teacher'

@injectable()
export default class ListAllTeachersCommandHandler implements CommandHandler<ListAllTeachersCommand> {
  constructor (
    @inject(TYPES.TeacherRepository) private readonly repository: TeacherRepository
  ) {}

  async handle (command: ListAllTeachersCommand): Promise<Teacher[]> {
    return await this.repository.findAll()
  }
}
