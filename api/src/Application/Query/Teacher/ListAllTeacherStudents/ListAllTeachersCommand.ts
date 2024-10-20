import type Command from '../../../../Domain/Command/Command'
import {TeacherId} from "../../../../Domain/Teacher/TeacherId";

export default class ListAllTeacherStudentsCommand implements Command {
    constructor (public teacherId: TeacherId) {}
}
