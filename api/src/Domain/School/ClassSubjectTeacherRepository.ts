import { ClassSubjectTeacherId } from "./ClassSubjectTeacherId";
import ClassSubjectTeacher from "./ClassSubjectTeacher";
import {TeacherId} from "../Teacher/TeacherId";

export default interface ClassSubjectTeacherRepository {
    /**
     * @throws RecordNotFound
     */
    get: (id: ClassSubjectTeacherId) => Promise<ClassSubjectTeacher>;

    upsert: (classSubjectTeacher: ClassSubjectTeacher) => Promise<ClassSubjectTeacher>;

    delete: (id: ClassSubjectTeacherId) => Promise<void>;

    findAll: () => Promise<ClassSubjectTeacher[]>;

    findByTeacher(teacherId: TeacherId): Promise<ClassSubjectTeacher[]>
}
