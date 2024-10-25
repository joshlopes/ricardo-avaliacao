import { GradeId } from './GradeId';
import SubTopic, { SubTopicArray } from '../Evaluation/SubTopic';
import Student, { StudentArray } from './Student';

export enum GradeEnum {
    NOT_WORKED = 'NOT_WORKED',
    EMERGENT = 'EMERGENT',
    DEVELOPING = 'DEVELOPING',
    ACHIEVED = 'ACHIEVED',
    MASTERED = 'MASTERED'
}

export interface GradeArray {
    id: string;
    subTopic: SubTopicArray;
    student: StudentArray;
    grade: string|GradeEnum;
    created_at?: Date | undefined;
}

export default class Grade {
    constructor(
        public id: GradeId,
        public grade: GradeEnum,
        public subTopic: SubTopic,
        public student: Student,
        public created_at?: Date | undefined,
    ) {}

    public static fromObject(object: GradeArray): Grade {
        return new Grade(
            GradeId.fromString(object.id),
            object.grade as GradeEnum,
            SubTopic.fromObject(object.subTopic),
            Student.fromObject(object.student),
            object.created_at,
        );
    }

    public toObject(): GradeArray {
        return {
            id: this.id.toString(),
            subTopic: this.subTopic.toObject(),
            student: this.student.toObject(),
            grade: this.grade,
            created_at: this.created_at,
        };
    }
}