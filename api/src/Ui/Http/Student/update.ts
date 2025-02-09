import { type Request, type Response } from 'express'
import { handleCommand } from '../handleCommandUtil'
import { StudentId } from '../../../Domain/School/StudentId'
import UpdateStudent from '../../../Application/Write/Student/UpdateStudent/UpdateStudent'

export const update = async (req: Request, resp: Response): Promise<void> => {
  if (!('name' in req.body)) {
    resp.status(400).send('Missing required field: name')
    return
  }

  await handleCommand(
    new UpdateStudent(
      StudentId.fromString(req.params.id),
      req.body.name as string
    ),
    resp,
    () => {
      resp.status(204).send()
    }
  )
}
