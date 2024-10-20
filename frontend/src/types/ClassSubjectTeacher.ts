import {Teacher} from "./Teacher";
import {SchoolClass} from "./SchoolClass";
import {Subject} from "./Subject";

export type ClassSubjectTeacher = {
    teacher: Teacher,
    schoolClass: SchoolClass,
    subject: Subject
}
