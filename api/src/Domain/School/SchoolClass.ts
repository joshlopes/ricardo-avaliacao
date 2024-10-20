import { SchoolClassId } from './SchoolClassId';
import ClassStudent, { ClassStudentArray } from './ClassStudent';
import Grade, { GradeArray } from './Grade';
import ClassSubjectTeacher, {ClassSubjectTeacherArray} from "./ClassSubjectTeacher";

export interface SchoolClassArray {
    id: string;
    name: string;
    year: string;
    students?: ClassStudentArray[];
    grades?: GradeArray[];
    ClassSubjectTeacher?: ClassSubjectTeacherArray[],
    created_at?: Date | undefined;
    updated_at?: Date | undefined;
}

export default class SchoolClass {
    constructor(
        public id: SchoolClassId,
        public name: string,
        public year: string,
        public students?: ClassStudent[],
        public grades?: Grade[],
        public classSubjectTeacher?: ClassSubjectTeacher[],
        public created_at?: Date | undefined,
        public updated_at?: Date | undefined
    ) {}

    public static fromObject(object: SchoolClassArray): SchoolClass {
        return new SchoolClass(
            SchoolClassId.fromString(object.id),
            object.name,
            object.year,
            object.students ? object.students.map(student => ClassStudent.fromObject(student)) : undefined,
            object.grades ? object.grades.map(grade => Grade.fromObject(grade)) : undefined,
            object.ClassSubjectTeacher ? object.ClassSubjectTeacher.map(classSubjectTeacher => ClassSubjectTeacher.fromObject(classSubjectTeacher)) : undefined,
            object.created_at,
            object.updated_at
        );
    }

    public toObject(): SchoolClassArray {
        return {
            id: this.id.toString(),
            name: this.name,
            year: this.year,
            students: this.students ? this.students.map(student => student.toObject()) : undefined,
            grades: this.grades ? this.grades.map(grade => grade.toObject()) : undefined,
            ClassSubjectTeacher: this.classSubjectTeacher ? this.classSubjectTeacher.map(classSubjectTeacher => classSubjectTeacher.toObject()) : undefined,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}
