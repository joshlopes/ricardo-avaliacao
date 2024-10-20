import { type Request, type Response } from 'express'
import { handleCommand } from '../handleCommandUtil'
import GetTeacherCommand from '../../../Application/Query/Teacher/GetTeacher/GetTeacherCommand'
import type Teacher from '../../../Domain/Teacher/Teacher'
import { TeacherId } from '../../../Domain/Teacher/TeacherId'

export const get = async (req: Request, resp: Response): Promise<void> => {
  await handleCommand(
    new GetTeacherCommand(TeacherId.fromString(req.params.id)),
    resp,
    (user: Teacher) => {
      resp.status(200).send(user.toObject())
    }
  )
}
