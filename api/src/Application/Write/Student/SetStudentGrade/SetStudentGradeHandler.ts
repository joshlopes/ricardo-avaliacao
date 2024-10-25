import {inject, injectable} from 'inversify'
import {TYPES} from '../../../../Infrastructure/DependencyInjection/types'
import CommandHandler from '../../../../Domain/Command/CommandHandler'
import SetStudentGrade from './SetStudentGrade'
import GradeRepository from '../../../../Domain/School/GradeRepository'
import Grade from '../../../../Domain/School/Grade'
import {GradeId} from "../../../../Domain/School/GradeId";
import StudentRepository from "../../../../Domain/School/StudentRepository";
import EvaluationSubTopicRepository from "../../../../Domain/Evaluation/EvaluationSubTopicRepository";

@injectable()
export default class SetStudentGradeHandler implements CommandHandler<SetStudentGrade> {
    constructor(
        @inject(TYPES.GradeRepository) private readonly repository: GradeRepository,
        @inject(TYPES.EvaluationSubTopicRepository) private readonly evaluationSubtopicRepository: EvaluationSubTopicRepository,
        @inject(TYPES.StudentRepository) private readonly studentRepository: StudentRepository
    ) {
    }

    async handle(command: SetStudentGrade): Promise<void> {
        const evaluationSubtopic = await this.evaluationSubtopicRepository.get(command.evaluationSubtopicId)
        const student = await this.studentRepository.get(command.studentId)
        let grade = await this.repository.findByStudentAndSubtopic(command.studentId, command.evaluationSubtopicId)
        if (grade === null) {
            grade = new Grade(
                GradeId.generate(),
                command.grade,
                evaluationSubtopic,
                student,
                new Date()
            )
        } else {
            grade.grade = command.grade
        }

        await this.repository.upsert(grade)
    }
}
