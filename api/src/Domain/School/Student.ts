import { StudentId } from './StudentId'
import ClassStudent, { type ClassStudentArray } from './ClassStudent'
import Grade, { type GradeArray } from './Grade'

export interface StudentArray {
  id: string
  name: string
  classes?: ClassStudentArray[]
  grades?: GradeArray[]
  created_at?: Date | undefined
  updated_at?: Date | undefined
}

export default class Student {
  constructor (
    public id: StudentId,
    public name: string,
    public classes?: ClassStudent[],
    public grades?: Grade[],
    public created_at?: Date | undefined,
    public updated_at?: Date | undefined
  ) {}

  public static fromObject (object: StudentArray): Student {
    return new Student(
      StudentId.fromString(object.id),
      object.name,
      object.classes !== undefined ? object.classes.map(cls => ClassStudent.fromObject(cls)) : undefined,
      object.grades !== undefined ? object.grades.map(grade => Grade.fromObject(grade)) : undefined,
      object.created_at,
      object.updated_at
    )
  }

  public toObject (): StudentArray {
    return {
      id: this.id.toString(),
      name: this.name,
      // classes: this.classes ? this.classes.map(cls => cls.toObject()) : undefined,
      // grades: this.grades ? this.grades.map(grade => grade.toObject()) : undefined,
      created_at: this.created_at,
      updated_at: this.updated_at
    }
  }
}
