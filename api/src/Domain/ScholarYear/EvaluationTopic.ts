import { EvaluationTopicId } from './EvaluationTopicId';
import ScholarYear, { ScholarYearArray } from './ScholarYear';
import SubTopic, { SubTopicArray } from './SubTopic';

export interface EvaluationTopicArray {
    id: string;
    name: string;
    scholarYear?: ScholarYearArray;
    subtopics?: SubTopicArray[];
    created_at?: Date | undefined;
    updated_at?: Date | undefined;
}

export default class EvaluationTopic {
    constructor(
        public id: EvaluationTopicId,
        public name: string,
        public scholarYear?: ScholarYear,
        public subtopics?: SubTopic[],
        public created_at?: Date | undefined,
        public updated_at?: Date | undefined
    ) {}

    public static fromObject(object: EvaluationTopicArray): EvaluationTopic {
        return new EvaluationTopic(
            EvaluationTopicId.fromString(object.id),
            object.name,
            object.scholarYear ? ScholarYear.fromObject(object.scholarYear) : undefined,
            object.subtopics ? object.subtopics.map(subtopic => SubTopic.fromObject(subtopic)) : undefined,
            object.created_at,
            object.updated_at
        );
    }

    public toObject(): EvaluationTopicArray {
        return {
            id: this.id.toString(),
            name: this.name,
            scholarYear: this.scholarYear ? this.scholarYear.toObject() : undefined,
            subtopics: this.subtopics ? this.subtopics.map(subtopic => subtopic.toObject()) : undefined,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}