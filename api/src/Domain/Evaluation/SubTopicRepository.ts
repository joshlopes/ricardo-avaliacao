import { SubTopicId } from "./SubTopicId";
import SubTopic from "./SubTopic";

export default interface SubTopicRepository {
    /**
     * @throws RecordNotFound
     */
    get: (id: SubTopicId) => Promise<SubTopic>;

    upsert: (subTopic: SubTopic) => Promise<SubTopic>;

    delete: (id: SubTopicId) => Promise<void>;

    findAll: () => Promise<SubTopic[]>;
}
