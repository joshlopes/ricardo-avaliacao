import CommandHandler from '../../../../Domain/Command/CommandHandler'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../../../Infrastructure/DependencyInjection/types'
import ListAllTeacherStudentsCommand from './ListAllTeacherStudentsCommand'
import StudentRepository from '../../../../Domain/School/StudentRepository'
import Student from '../../../../Domain/School/Student'

@injectable()
export default class ListAllTeacherStudentsCommandHandler implements CommandHandler<ListAllTeacherStudentsCommand> {
  constructor (
    @inject(TYPES.StudentRepository) private readonly repository: StudentRepository
  ) {}

  async handle (command: ListAllTeacherStudentsCommand): Promise<Student[]> {
    return await this.repository.findByTeacher(
      command.teacherId,
      command.schoolClassId,
      command.subjectId
    )
  }
}
