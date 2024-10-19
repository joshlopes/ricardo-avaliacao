import { SubjectId } from './SubjectId';

export interface SubjectArray {
    id: string;
    name: string;
    year: string;
    created_at?: Date | undefined;
    updated_at?: Date | undefined;
}

export default class Subject {
    constructor(
        public id: SubjectId,
        public name: string,
        public year: string,
        public created_at?: Date | undefined,
        public updated_at?: Date | undefined
    ) {}

    public static fromObject(object: SubjectArray): Subject {
        return new Subject(
            SubjectId.fromString(object.id),
            object.name,
            object.year,
            object.created_at,
            object.updated_at
        );
    }

    public toObject(): SubjectArray {
        return {
            id: this.id.toString(),
            name: this.name,
            year: this.year,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}