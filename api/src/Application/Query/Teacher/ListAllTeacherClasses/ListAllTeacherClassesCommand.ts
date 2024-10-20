import type Command from '../../../../Domain/Command/Command'
import {TeacherId} from "../../../../Domain/Teacher/TeacherId";

export default class ListAllTeacherClassesCommand implements Command {
    constructor (public teacherId: TeacherId) {}
}
