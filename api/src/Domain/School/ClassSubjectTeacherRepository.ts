import { ClassSubjectTeacherId } from "./ClassSubjectTeacherId";
import ClassSubjectTeacher from "./ClassSubjectTeacher";

export default interface ClassSubjectTeacherRepository {
    /**
     * @throws RecordNotFound
     */
    get: (id: ClassSubjectTeacherId) => Promise<ClassSubjectTeacher>;

    upsert: (classSubjectTeacher: ClassSubjectTeacher) => Promise<ClassSubjectTeacher>;

    delete: (id: ClassSubjectTeacherId) => Promise<void>;

    findAll: () => Promise<ClassSubjectTeacher[]>;
}
