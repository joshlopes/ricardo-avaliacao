import { EvaluationTopicId } from './EvaluationTopicId';
import Subject, {SubjectArray} from "../School/Subject";
import EvaluationTopic, {EvaluationTopicArray} from "./EvaluationTopic";

export interface EvaluationCategoryArray {
    id: string;
    name: string;
    year: string;
    Subject: SubjectArray,
    EvaluationTopics?: EvaluationTopicArray[];
    created_at?: Date | undefined;
    updated_at?: Date | undefined;
}

export default class EvaluationCategory {
    constructor(
        public id: EvaluationTopicId,
        public name: string,
        public year: string,
        public subject: Subject,
        public evaluationTopics?: EvaluationTopic[],
        public created_at?: Date | undefined,
        public updated_at?: Date | undefined
    ) {}

    public static fromObject(object: EvaluationCategoryArray): EvaluationCategory {
        return new EvaluationCategory(
            EvaluationTopicId.fromString(object.id),
            object.name,
            object.year,
            Subject.fromObject(object.Subject),
            object.EvaluationTopics ? object.EvaluationTopics.map(topic => EvaluationTopic.fromObject(topic)) : undefined,
            object.created_at,
            object.updated_at
        );
    }

    public toObject(): EvaluationCategoryArray {
        return {
            id: this.id.toString(),
            name: this.name,
            year: this.year,
            Subject: this.subject.toObject(),
            EvaluationTopics: this.evaluationTopics ? this.evaluationTopics.map(topic => topic.toObject()) : undefined,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}