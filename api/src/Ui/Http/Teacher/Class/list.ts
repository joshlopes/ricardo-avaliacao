import { type Request, type Response } from 'express'
import { handleCommand } from '../../handleCommandUtil'
import { TeacherId } from '../../../../Domain/Teacher/TeacherId'
import ListAllTeacherClassesCommand from '../../../../Application/Query/Teacher/ListAllTeacherClasses/ListAllTeacherClassesCommand'
import type SchoolClass from '../../../../Domain/School/SchoolClass'

export const list = async (req: Request, resp: Response): Promise<void> => {
  await handleCommand(
    new ListAllTeacherClassesCommand(TeacherId.fromString(req.params.id)),
    resp,
    (schoolClasses: SchoolClass[]) => {
      resp.status(200).send({
        results: schoolClasses.map((schoolClass: SchoolClass) => schoolClass.toObject())
      })
    }
  )
}
