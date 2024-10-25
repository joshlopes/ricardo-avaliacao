import { type Request, type Response } from 'express'
import { handleCommand } from '../handleCommandUtil'
import { SubjectId } from '../../../Domain/School/SubjectId'
import GetEvaluationCategories from '../../../Application/Query/Subject/GetEvaluationCategories/GetEvaluationCategories'
import type EvaluationCategory from '../../../Domain/Evaluation/EvaluationCategory'

export const getEvaluationCategories = async (req: Request, resp: Response): Promise<void> => {
  await handleCommand(
    new GetEvaluationCategories(
      SubjectId.fromString(req.params.subjectId),
      req.params.year
    ),
    resp,
    (evaluationCategories: EvaluationCategory[]) => {
      resp.status(200).send({
        results: evaluationCategories.map((evaluationCategory: EvaluationCategory) => evaluationCategory.toObject())
      })
    }
  )
}
