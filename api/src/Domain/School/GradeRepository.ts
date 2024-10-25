import { GradeId } from "./GradeId";
import Grade from "./Grade";
import {StudentId} from "./StudentId";
import {SubjectId} from "./SubjectId";

export default interface GradeRepository {
    /**
     * @throws RecordNotFound
     */
    get: (id: GradeId) => Promise<Grade>;

    upsert: (grade: Grade) => Promise<Grade>;

    delete: (id: GradeId) => Promise<void>;

    findAll: () => Promise<Grade[]>;
    
    findBySubjectAndStudent(studentId: StudentId, subjectId: SubjectId): Promise<Grade[]>;
}
