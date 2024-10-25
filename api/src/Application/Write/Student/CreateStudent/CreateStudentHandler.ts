import CommandHandler from '../../../../Domain/Command/CommandHandler'
import CreateStudent from './CreateStudent'
import { inject, injectable } from 'inversify'
import StudentRepository from '../../../../Domain/School/StudentRepository'
import { TYPES } from '../../../../Infrastructure/DependencyInjection/types'
import Student from '../../../../Domain/School/Student'
import SchoolClassRepository from '../../../../Domain/School/SchoolClassRepository'
import ClassStudent from '../../../../Domain/School/ClassStudent'
import ClassStudentRepository from '../../../../Domain/School/ClassStudentRepository'

@injectable()
export default class CreateStudentHandler implements CommandHandler<CreateStudent> {
  constructor (
    @inject(TYPES.StudentRepository) private readonly studentRepository: StudentRepository,
    @inject(TYPES.SchoolClassRepository) private readonly schoolClassRepository: SchoolClassRepository,
    @inject(TYPES.ClassStudentRepository) private readonly classStudentRepository: ClassStudentRepository
  ) {}

  async handle (command: CreateStudent): Promise<void> {
    await this.studentRepository.upsert(new Student(
      command.id,
      command.name,
      [],
      []
    ))

    await this.classStudentRepository.create(
      ClassStudent.create(
        await this.schoolClassRepository.get(command.schoolClassId),
        await this.studentRepository.get(command.id)
      )
    )
  }
}
