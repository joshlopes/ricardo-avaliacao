import { EvaluationTopicId } from './EvaluationTopicId';
import EvaluationSubTopic, { EvaluationSubTopicArray } from './EvaluationSubTopic';
import EvaluationCategory, {EvaluationCategoryArray} from "./EvaluationCategory";

export interface EvaluationTopicArray {
    id: string;
    name: string;
    EvaluationCategory: EvaluationCategoryArray,
    subtopics?: EvaluationSubTopicArray[];
    created_at?: Date | undefined;
    updated_at?: Date | undefined;
}

export default class EvaluationTopic {
    constructor(
        public id: EvaluationTopicId,
        public name: string,
        public evaluationCategory: EvaluationCategory,
        public subtopics?: EvaluationSubTopic[],
        public created_at?: Date | undefined,
        public updated_at?: Date | undefined
    ) {}

    public static fromObject(object: EvaluationTopicArray): EvaluationTopic {
        return new EvaluationTopic(
            EvaluationTopicId.fromString(object.id),
            object.name,
            EvaluationCategory.fromObject(object.EvaluationCategory),
            object.subtopics ? object.subtopics.map(subtopic => EvaluationSubTopic.fromObject(subtopic)) : undefined,
            object.created_at,
            object.updated_at
        );
    }

    public toObject(): EvaluationTopicArray {
        return {
            id: this.id.toString(),
            name: this.name,
            EvaluationCategory: this.evaluationCategory.toObject(),
            subtopics: this.subtopics ? this.subtopics.map(subtopic => subtopic.toObject()) : undefined,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}