import { type Request, type Response } from 'express'
import { myContainer } from '../../DependencyInjection/inversify.config'
import { TYPES } from '../../DependencyInjection/types'
import type SecurityProvider from '../../../Domain/Security/SecurityProvider'
import Token from '../../../Domain/Security/Token'
import VerificationFailed from '../../../Domain/Security/VerificationFailed'
import type Teacher from '../../../Domain/Teacher/Teacher'

export const authenticateMiddleware = async (req: Request, res: Response): Promise<void> => {
  const securityProvider: SecurityProvider = myContainer.get(TYPES.SecurityProvider)
  const token = req.headers.authorization
  if (token === undefined) {
    res.status(401).json({ message: 'No token provided' })
    return
  }

  try {
    await securityProvider.verifyToken(new Token(token))
      .then((user: Teacher) => {
        res.locals.user = user
      })
  } catch (error: any) {
    if (error instanceof VerificationFailed &&
            error.code === VerificationFailed.TOKEN_EXPIRED
    ) {
      res.status(401).json({ message: 'Token expired' })
      return
    }

    res.status(401).json({ message: 'Unauthorized' })
  }
}
