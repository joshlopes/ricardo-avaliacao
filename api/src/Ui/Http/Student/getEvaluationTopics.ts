import { type Request, type Response } from 'express'
import { handleCommand } from '../handleCommandUtil'
import {SubjectId} from "../../../Domain/School/SubjectId";
import GetEvaluationTopicsCommand from "../../../Application/Query/Subject/GetEvaluationTopics/GetEvaluationTopicsCommand";
import EvaluationTopic from "../../../Domain/Evaluation/EvaluationTopic";

export const getEvaluationTopics = async (req: Request, resp: Response): Promise<void> => {
    await handleCommand(
        new GetEvaluationTopicsCommand(
            SubjectId.fromString(req.params.subjectId),
        ),
        resp,
        (evaluationTopics: EvaluationTopic[]) => {
            resp.status(200).send({
                'results': evaluationTopics.map((evaluationTopic: EvaluationTopic) => evaluationTopic.toObject())
            })
        }
    )
}
