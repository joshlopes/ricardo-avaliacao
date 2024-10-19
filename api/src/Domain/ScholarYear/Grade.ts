import { GradeId } from './GradeId';
import SubTopic, { SubTopicArray } from './SubTopic';
import Student, { StudentArray } from './Student';
import SchoolClass, { SchoolClassArray } from './SchoolClass';

export enum GradeEnum {
    A = 'A',
    B = 'B',
    C = 'C',
    D = 'D',
    E = 'E'
}

export interface GradeArray {
    id: string;
    subTopic?: SubTopicArray;
    student?: StudentArray;
    schoolClass?: SchoolClassArray;
    grade: GradeEnum; // A, B, C, D, E, etc.
    created_at?: Date | undefined;
    updated_at?: Date | undefined;
}

export default class Grade {
    constructor(
        public id: GradeId,
        public grade: GradeEnum,
        public subTopic?: SubTopic,
        public student?: Student,
        public schoolClass?: SchoolClass,
        public created_at?: Date | undefined,
        public updated_at?: Date | undefined
    ) {}

    public static fromObject(object: GradeArray): Grade {
        return new Grade(
            GradeId.fromString(object.id),
            object.grade,
            object.subTopic ? SubTopic.fromObject(object.subTopic) : undefined,
            object.student ? Student.fromObject(object.student) : undefined,
            object.schoolClass ? SchoolClass.fromObject(object.schoolClass) : undefined,
            object.created_at,
            object.updated_at
        );
    }

    public toObject(): GradeArray {
        return {
            id: this.id.toString(),
            subTopic: this.subTopic ? this.subTopic.toObject() : undefined,
            student: this.student ? this.student.toObject() : undefined,
            schoolClass: this.schoolClass ? this.schoolClass.toObject() : undefined,
            grade: this.grade,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}