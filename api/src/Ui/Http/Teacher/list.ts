import { type Request, type Response } from 'express'
import { handleCommand } from '../handleCommandUtil'
import type Teacher from '../../../Domain/Teacher/Teacher'
import ListAllUsersCommand from '../../../Application/Query/User/ListAllUser/ListAllUsersCommand'

export const list = async (req: Request, resp: Response): Promise<void> => {
  await handleCommand(
    new ListAllUsersCommand(),
    resp,
    (users: Teacher[]) => {
      resp.status(200).send({
        results: users.map((user: Teacher) => user.toObject())
      })
    }
  )
}
