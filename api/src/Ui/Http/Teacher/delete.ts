import { type Request, type Response } from 'express'
import { handleCommand } from '../handleCommandUtil'
import DeleteTeacherCommand from '../../../Application/Write/Teacher/DeleteTeacher/DeleteTeacherCommand'
import { TeacherId } from '../../../Domain/Teacher/TeacherId'

export const remove = async (req: Request, resp: Response): Promise<void> => {
  await handleCommand(
    new DeleteTeacherCommand(TeacherId.fromString(req.params.id)),
    resp,
    () => resp.status(200).send()
  )
}
