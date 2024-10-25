import { ClassStudentId } from './ClassStudentId'
import SchoolClass, { type SchoolClassArray } from './SchoolClass'
import Student, { type StudentArray } from './Student'

export interface ClassStudentArray {
  id: string
  schoolClass?: SchoolClassArray
  student?: StudentArray
  created_at?: Date | undefined
  updated_at?: Date | undefined
}

export default class ClassStudent {
  constructor (
    public id: ClassStudentId,
    public schoolClass?: SchoolClass,
    public student?: Student,
    public created_at?: Date | undefined,
    public updated_at?: Date | undefined
  ) {}

  public static fromObject (object: ClassStudentArray): ClassStudent {
    return new ClassStudent(
      ClassStudentId.fromString(object.id),
      object.schoolClass !== undefined ? SchoolClass.fromObject(object.schoolClass) : undefined,
      object.student !== undefined ? Student.fromObject(object.student) : undefined,
      object.created_at,
      object.updated_at
    )
  }

  public toObject (): ClassStudentArray {
    return {
      id: this.id.toString(),
      schoolClass: this.schoolClass !== undefined ? this.schoolClass.toObject() : undefined,
      student: this.student !== undefined ? this.student.toObject() : undefined,
      created_at: this.created_at,
      updated_at: this.updated_at
    }
  }
}
