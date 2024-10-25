import { type Request, type Response } from 'express'
import { handleCommand } from '../../handleCommandUtil'
import { TeacherId } from '../../../../Domain/Teacher/TeacherId'
import type Student from '../../../../Domain/School/Student'
import ListAllTeacherStudentsCommand from '../../../../Application/Query/Teacher/ListAllTeacherStudents/ListAllTeacherStudentsCommand'
import { SchoolClassId } from '../../../../Domain/School/SchoolClassId'
import { SubjectId } from '../../../../Domain/School/SubjectId'

export const list = async (req: Request, resp: Response): Promise<void> => {
  const teacherId = TeacherId.fromString(req.params.id)
  const classId = req.params.classId !== undefined ? SchoolClassId.fromString(req.params.classId) : undefined
  const subjectId = req.params.subjectId !== undefined ? SubjectId.fromString(req.params.subjectId) : undefined

  await handleCommand(
    new ListAllTeacherStudentsCommand(teacherId, classId, subjectId),
    resp,
    (students: Student[]) => {
      resp.status(200).send({
        results: students.map((student: Student) => student.toObject())
      })
    }
  )
}
