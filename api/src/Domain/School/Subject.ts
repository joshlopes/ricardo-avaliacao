import { SubjectId } from './SubjectId'

export interface SubjectArray {
  id: string
  name: string
}

export default class Subject {
  constructor (
    public id: SubjectId,
    public name: string,
  ) {}

  public static fromObject (object: SubjectArray): Subject {
    return new Subject(
      SubjectId.fromString(object.id),
      object.name,
    )
  }

  public toObject (): SubjectArray {
    return {
      id: this.id.toString(),
      name: this.name,
    }
  }
}
