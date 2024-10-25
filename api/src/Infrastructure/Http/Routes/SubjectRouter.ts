import { getGrades } from '../../../Ui/Http/Student/grades'
import { Router, type Response, type Request, type NextFunction } from 'express'
import {getEvaluationTopics} from "../../../Ui/Http/Student/getEvaluationTopics";

const SubjectRouter = Router()

SubjectRouter.get('/:subjectId/evaluationTopics', (req: Request, resp: Response, next: NextFunction) => {
  getEvaluationTopics(req, resp).then(next).catch(next)
})

SubjectRouter.get('/:subjectId/student/:studentId/grades', (req: Request, resp: Response, next: NextFunction) => {
  getGrades(req, resp).then(next).catch(next)
})

export default SubjectRouter
