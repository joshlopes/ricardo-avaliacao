import { ClassSubjectTeacherId } from './ClassSubjectTeacherId';
import Teacher, { TeacherArray } from './../Teacher/Teacher';
import SchoolClass, { SchoolClassArray } from './SchoolClass';
import Subject, { SubjectArray } from './Subject';

export interface ClassSubjectTeacherArray {
    id: string;
    teacher?: TeacherArray;
    schoolClass?: SchoolClassArray;
    subject?: SubjectArray;
    created_at?: Date | undefined;
    updated_at?: Date | undefined;
}

export default class ClassSubjectTeacher {
    constructor(
        public id: ClassSubjectTeacherId,
        public teacher?: Teacher,
        public schoolClass?: SchoolClass,
        public subject?: Subject,
        public created_at?: Date | undefined,
        public updated_at?: Date | undefined
    ) {}

    public static fromObject(object: ClassSubjectTeacherArray): ClassSubjectTeacher {
        return new ClassSubjectTeacher(
            ClassSubjectTeacherId.fromString(object.id),
            object.teacher ? Teacher.fromObject(object.teacher) : undefined,
            object.schoolClass ? SchoolClass.fromObject(object.schoolClass) : undefined,
            object.subject ? Subject.fromObject(object.subject) : undefined,
            object.created_at,
            object.updated_at
        );
    }

    public toObject(): ClassSubjectTeacherArray {
        return {
            id: this.id.toString(),
            teacher: this.teacher ? this.teacher.toObject() : undefined,
            schoolClass: this.schoolClass ? this.schoolClass.toObject() : undefined,
            subject: this.subject ? this.subject.toObject() : undefined,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}
