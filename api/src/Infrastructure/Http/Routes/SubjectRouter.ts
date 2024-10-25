import { getGrades } from '../../../Ui/Http/Student/grades'
import { Router, type Response, type Request, type NextFunction } from 'express'
import { getEvaluationCategories } from '../../../Ui/Http/Subject/getEvaluationCategories'

const SubjectRouter = Router()

SubjectRouter.get('/:subjectId/year/:year/evaluation-categories', (req: Request, resp: Response, next: NextFunction) => {
  getEvaluationCategories(req, resp).then(next).catch(next)
})

SubjectRouter.get('/:subjectId/student/:studentId/grades', (req: Request, resp: Response, next: NextFunction) => {
  getGrades(req, resp).then(next).catch(next)
})

export default SubjectRouter
