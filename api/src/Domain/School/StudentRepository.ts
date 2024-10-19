import { StudentId } from "./StudentId";
import Student from "./Student";

export default interface StudentRepository {
    /**
     * @throws RecordNotFound
     */
    get: (id: StudentId) => Promise<Student>;

    upsert: (student: Student) => Promise<Student>;

    delete: (id: StudentId) => Promise<void>;

    findAll: () => Promise<Student[]>;
}