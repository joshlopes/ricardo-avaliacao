import CommandHandler from '../../../../Domain/Command/CommandHandler'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../../../Infrastructure/DependencyInjection/types'
import ListAllTeacherClassesCommand from './ListAllTeacherClassesCommand'
import SchoolClassRepository from '../../../../Domain/School/SchoolClassRepository'
import SchoolClass from '../../../../Domain/School/SchoolClass'

@injectable()
export default class ListAllTeacherClassesCommandHandler implements CommandHandler<ListAllTeacherClassesCommand> {
  constructor (
    @inject(TYPES.SchoolClassRepository) private readonly repository: SchoolClassRepository
  ) {}

  async handle (command: ListAllTeacherClassesCommand): Promise<SchoolClass[]> {
    return await this.repository.findByTeacher(command.teacherId)
  }
}
