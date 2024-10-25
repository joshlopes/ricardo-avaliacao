import type Command from '../../../../Domain/Command/Command'
import {TeacherId} from "../../../../Domain/Teacher/TeacherId";
import {SchoolClassId} from "../../../../Domain/School/SchoolClassId";
import {SubjectId} from "../../../../Domain/School/SubjectId";

export default class ListAllTeacherStudentsCommand implements Command {
    constructor (
        public teacherId: TeacherId,
        public schoolClassId?: SchoolClassId,
        public subjectId?: SubjectId,
    ) {}
}