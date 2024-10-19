import {SchoolClassId} from "./SchoolClassId";
import SchoolClass from "./SchoolClass";

export default interface SchoolClassRepository {
    /**
     * @throws RecordNotFound
     */
    get: (id: SchoolClassId) => Promise<SchoolClass>

    upsert: (schoolClass: SchoolClass) => Promise<SchoolClass>

    delete: (id: SchoolClassId) => Promise<void>

    findAll: () => Promise<SchoolClass[]>
}
