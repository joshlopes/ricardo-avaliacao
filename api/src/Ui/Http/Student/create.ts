import { type Request, type Response } from 'express'
import { handleCommand } from '../handleCommandUtil'
import { StudentId } from '../../../Domain/School/StudentId'
import CreateStudent from '../../../Application/Write/Student/CreateStudent/CreateStudent'
import { SchoolClassId } from '../../../Domain/School/SchoolClassId'
import { SubjectId } from '../../../Domain/School/SubjectId'

export const create = async (req: Request, resp: Response): Promise<void> => {
  const requiredFields = ['schoolClassId', 'subjectId', 'name']
  const missingFields = requiredFields.filter((field) => !(field in req.body))
  if (missingFields.length > 0) {
    resp.status(400).send(`Missing fields: ${missingFields.join(', ')}`)
    return
  }

  const newStudentId = StudentId.generate()

  await handleCommand(
    new CreateStudent(
      newStudentId,
      SchoolClassId.fromString(req.body.schoolClassId as string),
      SubjectId.fromString(req.body.subjectId as string),
      req.body.name as string
    ),
    resp,
    () => {
      resp.status(201).send({ id: newStudentId.toString() })
    }
  )
}
