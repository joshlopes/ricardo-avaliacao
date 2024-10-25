import {ClassSubjectTeacher} from "./ClassSubjectTeacher";

export type SchoolClassInput = {
    id: string
    name: string
    year: string
}

export type SchoolClass = {
    id: string
    name: string
    year: string
    ClassSubjectTeacher?: ClassSubjectTeacher[]
}