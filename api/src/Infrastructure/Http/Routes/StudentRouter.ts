import { Router, type Response, type Request, type NextFunction } from 'express'
import { setGrade } from '../../../Ui/Http/Student/setGrade'
import { create } from '../../../Ui/Http/Student/create'
import { update } from '../../../Ui/Http/Student/update'

const StudentRouter = Router()

StudentRouter.post('/:id/grades', (req: Request, resp: Response, next: NextFunction) => {
  setGrade(req, resp).then(next).catch(next)
})

StudentRouter.post('', (req: Request, resp: Response, next: NextFunction) => {
  create(req, resp).then(next).catch(next)
})

StudentRouter.put('/:id', (req: Request, resp: Response, next: NextFunction) => {
  update(req, resp).then(next).catch(next)
})

export default StudentRouter
