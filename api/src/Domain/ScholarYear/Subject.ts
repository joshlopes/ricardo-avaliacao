import { SubjectId } from './SubjectId';
import ScholarYear , { ScholarYearArray } from './ScholarYear';

export interface SubjectArray {
    id: string;
    name: string;
    scholarYear?: ScholarYearArray[];
    created_at?: Date | undefined;
    updated_at?: Date | undefined;
}

export default class Subject {
    constructor(
        public id: SubjectId,
        public name: string,
        public scholarYear?: ScholarYear[],
        public created_at?: Date | undefined,
        public updated_at?: Date | undefined
    ) {}

    public static fromObject(object: SubjectArray): Subject {
        return new Subject(
            SubjectId.fromString(object.id),
            object.name,
            object.scholarYear ? object.scholarYear.map(year => ScholarYear.fromObject(year)) : undefined,
            object.created_at,
            object.updated_at
        );
    }

    public toObject(): SubjectArray {
        return {
            id: this.id.toString(),
            name: this.name,
            scholarYear: this.scholarYear ? this.scholarYear.map(year => year.toObject()) : undefined,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}