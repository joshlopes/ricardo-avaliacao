import { EvaluationSubTopicId } from "./EvaluationSubTopicId";
import EvaluationSubTopic from "./EvaluationSubTopic";

export default interface SubTopicRepository {
    /**
     * @throws RecordNotFound
     */
    get: (id: EvaluationSubTopicId) => Promise<EvaluationSubTopic>;

    upsert: (subTopic: EvaluationSubTopic) => Promise<EvaluationSubTopic>;

    delete: (id: EvaluationSubTopicId) => Promise<void>;

    findAll: () => Promise<EvaluationSubTopic[]>;
}
