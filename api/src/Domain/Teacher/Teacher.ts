import { TeacherId } from './TeacherId'

export interface TeacherArray {
  id: string
  email: string
  name: string
  lastLoggedIn: Date | null
  password?: string
  raw_password?: string | null
  created_at?: Date | undefined
  updated_at?: Date | undefined
}

export default class Teacher {
  constructor (
    public id: TeacherId,
    public email: string,
    public name: string,
    public lastLoggedIn: Date | null,
    public password: string,
    public rawPassword: string | null,
    public created_at?: Date | undefined,
    public updated_at?: Date | undefined
  ) {
  }

  public static fromObject (object: TeacherArray): Teacher {
    return new Teacher(
      TeacherId.fromString(object.id),
      object.email,
      object.name,
      object.lastLoggedIn ?? null,
      object.password ?? '',
      object.raw_password ?? null,
      object.created_at,
      object.updated_at
    )
  }

  public toObject (): TeacherArray {
    return {
      id: this.id.toString(),
      email: this.email,
      name: this.name,
      lastLoggedIn: this.lastLoggedIn,
      created_at: this.created_at,
      updated_at: this.updated_at
    }
  }
}
