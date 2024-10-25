import { ClassStudentId } from './ClassStudentId'
import SchoolClass, { type SchoolClassArray } from './SchoolClass'
import Student, { type StudentArray } from './Student'

export interface ClassStudentArray {
  id: string
  schoolClass?: SchoolClassArray
  student?: StudentArray
}

export default class ClassStudent {
  constructor (
    public id: ClassStudentId,
    public schoolClass?: SchoolClass,
    public student?: Student
  ) {
  }

  public static create (schoolClass: SchoolClass, student: Student): ClassStudent {
    return new ClassStudent(
      ClassStudentId.generate(),
      schoolClass,
      student
    )
  }

  public static fromObject (object: ClassStudentArray): ClassStudent {
    return new ClassStudent(
      ClassStudentId.fromString(object.id),
      object.schoolClass !== undefined ? SchoolClass.fromObject(object.schoolClass) : undefined,
      object.student !== undefined ? Student.fromObject(object.student) : undefined
    )
  }

  public toObject (): ClassStudentArray {
    return {
      id: this.id.toString(),
      schoolClass: this.schoolClass !== undefined ? this.schoolClass.toObject() : undefined,
      student: this.student !== undefined ? this.student.toObject() : undefined
    }
  }
}
