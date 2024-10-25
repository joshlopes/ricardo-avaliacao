import { type Request, type Response } from 'express'
import { handleCommand } from '../handleCommandUtil'
import type Teacher from '../../../Domain/Teacher/Teacher'
import ListAllTeachersCommand from '../../../Application/Query/Teacher/ListAllTeachers/ListAllTeachersCommand'

export const list = async (req: Request, resp: Response): Promise<void> => {
  await handleCommand(
    new ListAllTeachersCommand(),
    resp,
    (users: Teacher[]) => {
      resp.status(200).send({
        results: users.map((user: Teacher) => user.toObject())
      })
    }
  )
}
