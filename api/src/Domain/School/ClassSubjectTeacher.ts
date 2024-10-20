import { ClassSubjectTeacherId } from './ClassSubjectTeacherId';
import Teacher, { TeacherArray } from './../Teacher/Teacher';
import SchoolClass, { SchoolClassArray } from './SchoolClass';
import Subject, { SubjectArray } from './Subject';

export interface ClassSubjectTeacherArray {
    id: string;
    teacher: TeacherArray;
    schoolClass: SchoolClassArray;
    subject: SubjectArray;
    created_at?: Date | undefined;
    updated_at?: Date | undefined;
}

export default class ClassSubjectTeacher {
    constructor(
        public id: ClassSubjectTeacherId,
        public teacher: Teacher,
        public schoolClass: SchoolClass,
        public subject: Subject,
        public created_at?: Date | undefined,
        public updated_at?: Date | undefined
    ) {}

    public static fromObject(object: ClassSubjectTeacherArray): ClassSubjectTeacher {
        return new ClassSubjectTeacher(
            ClassSubjectTeacherId.fromString(object.id),
            Teacher.fromObject(object.teacher),
            SchoolClass.fromObject(object.schoolClass),
            Subject.fromObject(object.subject),
            object.created_at,
            object.updated_at
        );
    }

    public toObject(): ClassSubjectTeacherArray {
        return {
            id: this.id.toString(),
            //teacherId: this.teacher.id.toString(),
            teacher: this.teacher.toObject(),
            //classId: this.schoolClass.id.toString(),
            schoolClass: this.schoolClass.toObject(),
            //subjectId: this.subject.id.toString(),
            subject: this.subject.toObject(),
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}
