import { list } from '../../../Ui/Http/Teacher/list'
import { me } from '../../../Ui/Http/Teacher/me'
import { get } from '../../../Ui/Http/Teacher/get'
import { upsert } from '../../../Ui/Http/Teacher/upsert'
import { remove } from '../../../Ui/Http/Teacher/delete'
import { Router, type Response, type Request, type NextFunction } from 'express'
import { authenticateMiddleware } from '../MiddleAware/AuthenticateMiddleware'

const TeacherRouter = Router()

TeacherRouter.get('/', (req: Request, resp: Response, next: NextFunction) => {
  list(req, resp).then(next).catch(next)
})
TeacherRouter.get('/me', (req: Request, resp: Response, next: NextFunction) => {
  authenticateMiddleware(req, resp).then(next).catch(next)
}, (req: Request, resp: Response, next: NextFunction) => {
  me(req, resp).then(next).catch(next)
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

export default TeacherRouter
