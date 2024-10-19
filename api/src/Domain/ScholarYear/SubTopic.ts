import { SubTopicId } from './SubTopicId';
import EvaluationTopic, { EvaluationTopicArray } from './EvaluationTopic';
import { Grade, GradeArray } from './Grade';

export interface SubTopicArray {
    id: string;
    name: string;
    evaluationTopic?: EvaluationTopicArray;
    grades?: GradeArray[];
    created_at?: Date | undefined;
    updated_at?: Date | undefined;
}

export default class SubTopic {
    constructor(
        public id: SubTopicId,
        public name: string,
        public evaluationTopic?: EvaluationTopic,
        public grades?: Grade[],
        public created_at?: Date | undefined,
        public updated_at?: Date | undefined
    ) {}

    public static fromObject(object: SubTopicArray): SubTopic {
        return new SubTopic(
            SubTopicId.fromString(object.id),
            object.name,
            object.evaluationTopic ? EvaluationTopic.fromObject(object.evaluationTopic) : undefined,
            object.grades ? object.grades.map(grade => Grade.fromObject(grade)) : undefined,
            object.created_at,
            object.updated_at
        );
    }

    public toObject(): SubTopicArray {
        return {
            id: this.id.toString(),
            name: this.name,
            evaluationTopic: this.evaluationTopic ? this.evaluationTopic.toObject() : undefined,
            grades: this.grades ? this.grades.map(grade => grade.toObject()) : undefined,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}