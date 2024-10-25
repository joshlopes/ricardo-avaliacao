import { EvaluationTopicId } from "./EvaluationTopicId";
import EvaluationTopic from "./EvaluationTopic";
import {SubjectId} from "../School/SubjectId";

export default interface EvaluationTopicRepository {
    /**
     * @throws RecordNotFound
     */
    get: (id: EvaluationTopicId) => Promise<EvaluationTopic>;

    upsert: (evaluationTopic: EvaluationTopic) => Promise<EvaluationTopic>;

    delete: (id: EvaluationTopicId) => Promise<void>;

    findAll: () => Promise<EvaluationTopic[]>;

    findBySubject(subjectId: SubjectId): Promise<EvaluationTopic[]>;
}
