import { login } from '../../../Ui/Http/Login/login'
import { Router, type Response, type Request, type NextFunction } from 'express'
import { refresh } from '../../../Ui/Http/Login/refresh'
import { logout } from '../../../Ui/Http/Login/logout'
import { authenticateMiddleware } from '../MiddleAware/AuthenticateMiddleware'
import { me } from '../../../Ui/Http/Login/me'

const SecurityRouter = Router()

SecurityRouter.get('/me', (req: Request, resp: Response, next: NextFunction) => {
  authenticateMiddleware(req, resp).then(next).catch(next)
}, (req: Request, resp: Response, next: NextFunction) => {
  me(req, resp).then(next).catch(next)
})
SecurityRouter.post('/login', (req: Request, resp: Response, next: NextFunction) => {
  login(req, resp).then(next).catch(next)
})
SecurityRouter.post('/refresh', (req: Request, resp: Response, next: NextFunction) => {
  refresh(req, resp).then(next).catch(next)
})
SecurityRouter.post('/logout', (req: Request, resp: Response, next: NextFunction) => {
  logout(req, resp).then(next).catch(next)
})

export default SecurityRouter
