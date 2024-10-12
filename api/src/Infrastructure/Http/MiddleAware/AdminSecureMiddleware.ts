import { type Request, type Response } from 'express'

export const adminSecureMiddleware = async (req: Request, res: Response): Promise<void> => {
  if (res.locals.user === undefined) {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
