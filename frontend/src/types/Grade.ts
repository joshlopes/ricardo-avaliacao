import {Subtopic} from "./Subtopic";
import {Student} from "./Student";

export enum GradeEnum {
    NOT_WORKED = 'NOT_WORKED',
    EMERGENT = 'EMERGENT',
    IN_PROGRESS = 'IN_PROGRESS',
    ACHIEVED = 'ACHIEVED',
    MASTERED = 'MASTERED'
}

export type Grade = {
    id: string;
    subTopic?: Subtopic;
    student?: Student;
    grade: GradeEnum;
    created_at?: Date | undefined;
    updated_at?: Date | undefined;
}