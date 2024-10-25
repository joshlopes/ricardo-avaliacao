import { type Request, type Response } from 'express'
import { handleCommand } from '../handleCommandUtil'
import UpsertTeacherCommand from '../../../Application/Write/Teacher/UpsertTeacher/UpsertTeacherCommand'
import { castToString, castToStringOrUndefined } from '../HttpUtil'
import { TeacherId } from '../../../Domain/Teacher/TeacherId'

export const upsert = async (req: Request, resp: Response): Promise<void> => {
  if (req.method === 'PUT' && req.params.id === undefined) {
    resp.status(400).send('ID is required for update')
    return
  }

  const requiredFields = [
    'email',
    'name',
    req.method === 'PUT' ? undefined : 'raw_password'
  ]
  const missingFields = requiredFields.filter((field) => field !== undefined && !(field in req.body))
  if (missingFields.length > 0) {
    resp.status(400).send(`Missing fields: ${missingFields.join(', ')}`)
    return
  }

  await handleCommand(
    new UpsertTeacherCommand(
      req.params.id === undefined ? TeacherId.generate() : TeacherId.fromString(req.params.id),
      castToString(req.body.email),
      castToString(req.body.name),
      castToStringOrUndefined(req.body.raw_password)
    ),
    resp,
    () => resp.status(req.method === 'PUT' ? 204 : 201).send()
  )
}
