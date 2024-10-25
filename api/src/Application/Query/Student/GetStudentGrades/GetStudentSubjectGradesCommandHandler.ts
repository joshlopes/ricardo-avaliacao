import { inject, injectable } from 'inversify'
import { TYPES } from '../../../../Infrastructure/DependencyInjection/types'
import CommandHandler from '../../../../Domain/Command/CommandHandler'
import GetStudentSubjectGradesCommand from "./GetStudentSubjectGradesCommand"
import GradeRepository from "../../../../Domain/School/GradeRepository";
import Grade from "../../../../Domain/School/Grade";

@injectable()
export default class GetStudentSubjectGradesCommandHandler implements CommandHandler<GetStudentSubjectGradesCommand> {
  constructor (
    @inject(TYPES.GradeRepository) private readonly repository: GradeRepository
  ) {}

  async handle (command: GetStudentSubjectGradesCommand): Promise<Grade[]> {
    return await this.repository.findBySubjectAndStudent(command.studentId, command.subjectId)
  }
}
