import { type Request, type Response } from 'express'
import { handleCommand } from '../handleCommandUtil'
import GetStudentSubjectGradesCommand from '../../../Application/Query/Student/GetStudentGrades/GetStudentSubjectGradesCommand'
import { SubjectId } from '../../../Domain/School/SubjectId'
import { StudentId } from '../../../Domain/School/StudentId'
import type Grade from '../../../Domain/School/Grade'

export const getGrades = async (req: Request, resp: Response): Promise<void> => {
  await handleCommand(
    new GetStudentSubjectGradesCommand(
      StudentId.fromString(req.params.studentId),
      SubjectId.fromString(req.params.subjectId)
    ),
    resp,
    (grade: Grade[]) => {
      resp.status(200).send({
        results: grade.map((grade: Grade) => grade.toObject())
      })
    }
  )
}
