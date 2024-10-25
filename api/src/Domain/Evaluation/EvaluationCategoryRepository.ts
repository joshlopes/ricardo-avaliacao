import { EvaluationTopicId } from "./EvaluationTopicId";
import EvaluationTopic from "./EvaluationTopic";
import {SubjectId} from "../School/SubjectId";
import {EvaluationCategoryId} from "./EvaluationCategoryId";
import EvaluationCategory from "./EvaluationCategory";

export default interface EvaluationCategoryRepository {
    /**
     * @throws RecordNotFound
     */
    get: (id: EvaluationCategoryId) => Promise<EvaluationCategory>;

    upsert: (evaluationCategory: EvaluationCategory) => Promise<EvaluationCategory>;

    delete: (id: EvaluationCategoryId) => Promise<void>;

    findAll: () => Promise<EvaluationCategory[]>;

    findBySubject(subjectId: SubjectId): Promise<EvaluationCategory[]>;
}
