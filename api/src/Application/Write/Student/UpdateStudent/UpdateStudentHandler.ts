import CommandHandler from '../../../../Domain/Command/CommandHandler'
import UpdateStudent from './UpdateStudent'
import { inject, injectable } from 'inversify'
import StudentRepository from '../../../../Domain/School/StudentRepository'
import { TYPES } from '../../../../Infrastructure/DependencyInjection/types'

@injectable()
export default class UpdateStudentHandler implements CommandHandler<UpdateStudent> {
  constructor (
    @inject(TYPES.StudentRepository) private readonly studentRepository: StudentRepository,
  ) {}

  async handle (command: UpdateStudent): Promise<void> {
    const existingStudent = await this.studentRepository.get(command.id)

    if (command.name) {
        existingStudent.name = command.name
    }

    await this.studentRepository.upsert(existingStudent)
  }
}
