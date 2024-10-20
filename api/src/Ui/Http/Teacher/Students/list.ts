import { type Request, type Response } from 'express'
import { handleCommand } from '../../handleCommandUtil'
import ListAllTeacherStudentsCommand from "../../../../Application/Query/Teacher/ListAllTeacherStudents/ListAllTeachersCommand";
import {TeacherId} from "../../../../Domain/Teacher/TeacherId";
import Student from "../../../../Domain/School/Student";

export const list = async (req: Request, resp: Response): Promise<void> => {
    await handleCommand(
        new ListAllTeacherStudentsCommand(TeacherId.fromString(req.params.id)),
        resp,
        (students: Student[]) => {
            resp.status(200).send({
                results: students.map((student: Student) => student.toObject())
            })
        }
    )
}
