import { list } from '../../../Ui/Http/Teacher/list'
import { list as listStudents } from '../../../Ui/Http/Teacher/Students/list'
import { list as listClasses } from '../../../Ui/Http/Teacher/Class/list'
import { get } from '../../../Ui/Http/Teacher/get'
import { upsert } from '../../../Ui/Http/Teacher/upsert'
import { remove } from '../../../Ui/Http/Teacher/delete'
import { Router, type Response, type Request, type NextFunction } from 'express'

const TeacherRouter = Router()

TeacherRouter.get('/', (req: Request, resp: Response, next: NextFunction) => {
  list(req, resp).then(next).catch(next)
})
TeacherRouter.post('/', (req: Request, resp: Response, next: NextFunction) => {
  upsert(req, resp).then(next).catch(next)
})
TeacherRouter.get('/:id([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})', (req: Request, resp: Response, next: NextFunction) => {
  get(req, resp).then(next).catch(next)
})
TeacherRouter.put('/:id([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})', (req: Request, resp: Response, next: NextFunction) => {
  upsert(req, resp).then(next).catch(next)
})
TeacherRouter.delete('/:id([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})', (req: Request, resp: Response, next: NextFunction) => {
  remove(req, resp).then(next).catch(next)
})

// Teacher students
TeacherRouter.get('/:id/classes/:classId/subject/:subjectId/students', (req: Request, resp: Response, next: NextFunction) => {
  listStudents(req, resp).then(next).catch(next)
})

// Teacher Classes
TeacherRouter.get('/:id/classes', (req: Request, resp: Response, next: NextFunction) => {
  listClasses(req, resp).then(next).catch(next)
})

export default TeacherRouter
