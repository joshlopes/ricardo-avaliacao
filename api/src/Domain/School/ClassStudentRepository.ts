import { ClassStudentId } from "./ClassStudentId";
import ClassStudent from "./ClassStudent";

export default interface ClassStudentRepository {
    /**
     * @throws RecordNotFound
     */
    get: (id: ClassStudentId) => Promise<ClassStudent>;

    upsert: (classStudent: ClassStudent) => Promise<ClassStudent>;

    delete: (id: ClassStudentId) => Promise<void>;

    findAll: () => Promise<ClassStudent[]>;
}