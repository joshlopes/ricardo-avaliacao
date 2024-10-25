import { inject, injectable } from 'inversify'
import { TYPES } from '../../../../Infrastructure/DependencyInjection/types'
import CommandHandler from '../../../../Domain/Command/CommandHandler'
import GetEvaluationTopicsCommand from "./GetEvaluationTopicsCommand"
import EvaluationTopic from "../../../../Domain/Evaluation/EvaluationTopic";
import EvaluationTopicRepository from "../../../../Domain/Evaluation/EvaluationTopicRepository";

@injectable()
export default class GetEvaluationTopicsCommandHandler implements CommandHandler<GetEvaluationTopicsCommand> {
  constructor (
    @inject(TYPES.EvaluationTopicRepository) private readonly repository: EvaluationTopicRepository
  ) {}

  async handle (command: GetEvaluationTopicsCommand): Promise<EvaluationTopic[]> {
    return await this.repository.findBySubject(command.subjectId)
  }
}
