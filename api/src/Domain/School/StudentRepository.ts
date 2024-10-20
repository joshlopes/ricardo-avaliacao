import { StudentId } from "./StudentId";
import Student from "./Student";
import {TeacherId} from "../Teacher/TeacherId";
import {SchoolClassId} from "./SchoolClassId";
import {SubjectId} from "./SubjectId";

export default interface StudentRepository {
    /**
     * @throws RecordNotFound
     */
    get: (id: StudentId) => Promise<Student>;

    upsert: (student: Student) => Promise<Student>;

    delete: (id: StudentId) => Promise<void>;

    findAll: () => Promise<Student[]>;

    findByTeacher(teacherId: TeacherId, schoolClassId?: SchoolClassId, subjectId?: SubjectId): Promise<Student[]>;
}