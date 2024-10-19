import { ScholarYearId } from './ScholarYearId'
import Subject, { SubjectArray } from './Subject';
import EvaluationTopic, { EvaluationTopicArray } from './EvaluationTopic';

export interface ScholarYearArray {
    id: string;
    year: string;
    subject?: SubjectArray;
    topics?: EvaluationTopicArray[];
    created_at?: Date | undefined;
    updated_at?: Date | undefined;
}

export default class ScholarYear {
    constructor(
        public id: ScholarYearId,
        public year: string,
        public subject?: Subject,
        public topics?: EvaluationTopic[],
        public created_at?: Date | undefined,
        public updated_at?: Date | undefined
    ) {}

    public static fromObject(object: ScholarYearArray): ScholarYear {
        return new ScholarYear(
            ScholarYearId.fromString(object.id),
            object.year,
            object.subject ? Subject.fromObject(object.subject) : undefined,
            object.topics ? object.topics.map(topic => EvaluationTopic.fromObject(topic)) : undefined,
            object.created_at,
            object.updated_at
        );
    }

    public toObject(): ScholarYearArray {
        return {
            id: this.id.toString(),
            year: this.year,
            subject: this.subject?.toObject(),
            topics: this.topics?.map(topic => topic.toObject()),
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}