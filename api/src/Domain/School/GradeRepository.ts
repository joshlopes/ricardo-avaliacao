import { GradeId } from "./GradeId";
import Grade from "./Grade";

export default interface GradeRepository {
    /**
     * @throws RecordNotFound
     */
    get: (id: GradeId) => Promise<Grade>;

    upsert: (grade: Grade) => Promise<Grade>;

    delete: (id: GradeId) => Promise<void>;

    findAll: () => Promise<Grade[]>;
}
