import { Router, type Response, type Request, type NextFunction } from 'express'
import {setGrade} from "../../../Ui/Http/Student/setGrade";

const StudentRouter = Router()

StudentRouter.post('/:id/grades', (req: Request, resp: Response, next: NextFunction) => {
    setGrade(req, resp).then(next).catch(next)
})

export default StudentRouter
