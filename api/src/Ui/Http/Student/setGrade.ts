import { type Request, type Response } from 'express'
import { handleCommand } from '../handleCommandUtil'
import { StudentId } from '../../../Domain/School/StudentId'
import SetStudentGrade from "../../../Application/Write/Student/SetStudentGrade/SetStudentGrade";
import {EvaluationSubTopicId} from "../../../Domain/Evaluation/EvaluationSubTopicId";
import {GradeEnum} from "../../../Domain/School/Grade";

export const setGrade = async (req: Request, resp: Response): Promise<void> => {
    const requiredFields = ['subTopicId', 'grade']
    const missingFields = requiredFields.filter((field) => !(field in req.body))
    if (missingFields.length > 0) {
        resp.status(400).send(`Missing fields: ${missingFields.join(', ')}`)
        return
    }

    await handleCommand(
        new SetStudentGrade(
            StudentId.fromString(req.params.id),
            EvaluationSubTopicId.fromString(req.body.subTopicId),
            req.body.grade as GradeEnum
        ),
        resp,
        () => {
            resp.status(200).send()
        }
    )
}
