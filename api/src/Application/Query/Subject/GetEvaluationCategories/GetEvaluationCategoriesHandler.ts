import { inject, injectable } from 'inversify'
import { TYPES } from '../../../../Infrastructure/DependencyInjection/types'
import CommandHandler from '../../../../Domain/Command/CommandHandler'
import GetEvaluationCategories from './GetEvaluationCategories'
import EvaluationCategoryRepository from "../../../../Domain/Evaluation/EvaluationCategoryRepository";
import EvaluationCategory from "../../../../Domain/Evaluation/EvaluationCategory";

@injectable()
export default class GetEvaluationCategoriesHandler implements CommandHandler<GetEvaluationCategories> {
  constructor (
    @inject(TYPES.EvaluationCategoryRepository) private readonly repository: EvaluationCategoryRepository
  ) {}

  async handle (command: GetEvaluationCategories): Promise<EvaluationCategory[]> {
    return await this.repository.findBySubjectAndYear(command.subjectId, command.year)
  }
}
