import { StudentId } from "./StudentId";
import Student from "./Student";
import {TeacherId} from "../Teacher/TeacherId";

export default interface StudentRepository {
    /**
     * @throws RecordNotFound
     */
    get: (id: StudentId) => Promise<Student>;

    upsert: (student: Student) => Promise<Student>;

    delete: (id: StudentId) => Promise<void>;

    findAll: () => Promise<Student[]>;

    findByTeacher(teacherId: TeacherId): Promise<Student[]>;
}