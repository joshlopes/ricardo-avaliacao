import { inject, injectable } from 'inversify'
import TeacherRepository from '../../../../Domain/Teacher/TeacherRepository'
import { TYPES } from '../../../DependencyInjection/types'
import { PrismaClient } from '@prisma/client'
import Teacher, { TeacherArray } from '../../../../Domain/Teacher/Teacher'
import RecordNotFound from '../../../../Domain/RecordNotFound'
import { PasswordEncoder } from '../../../../Domain/Security/PasswordEncoder'
import TeacherAlreadyExists from '../../../../Domain/Teacher/TeacherAlreadyExists'
import { TeacherId } from '../../../../Domain/Teacher/TeacherId'

@injectable()
export default class OrmTeacherRepository implements TeacherRepository {
  constructor (
    @inject(TYPES.PrismaClient) private readonly prismaClient: PrismaClient,
    @inject(TYPES.PasswordEncoder) private readonly passwordEncoder: PasswordEncoder
  ) {
  }

  public async get (id: TeacherId): Promise<Teacher> {
    const teacher = await this.prismaClient.teacher.findUnique({
      where: { id: id.toString() }
    })

    if (teacher === null) {
      throw new RecordNotFound(`Teacher with "${id.toString()}" id not found`)
    }

    return Teacher.fromObject(teacher)
  }

  public async findByEmail (email: string): Promise<Teacher | null> {
    try {
      return await this.getByEmail(email)
    } catch (error: any) {
      if (error instanceof RecordNotFound) {
        return null
      }

      throw error
    }
  }

  public async getByEmail (email: string): Promise<Teacher> {
    const teacher = await this.prismaClient.teacher.findUnique({
      where: {
        email
      }
    })

    if (teacher === null) {
      throw new RecordNotFound(`Teacher with "${email}" email not found`)
    }

    return Teacher.fromObject(teacher)
  }

  async upsert (teacher: Teacher): Promise<Teacher> {
    const data: TeacherArray = {
      id: teacher.id.toString(),
      email: teacher.email,
      name: teacher.name,
      lastLoggedIn: teacher.lastLoggedIn,
      ...teacher.rawPassword !== null ? { password: await this.passwordEncoder.hash(teacher.rawPassword) } : {}
    }
    
    const upsertedTeacher = await this.prismaClient.teacher.upsert({
      where: { id: teacher.id.toString() },
      update: data,
      create: {
        ...data,
        password: data.password ?? (() => { throw new Error('Password is required'); })()
      }
    });

    return Teacher.fromObject(upsertedTeacher);
  }

  async delete (id: TeacherId): Promise<void> {
    await this.prismaClient.teacher.delete({
      where: {
        id: id.toString()
      }
    })
  }

  async findAll (): Promise<Teacher[]> {
    const teachers = await this.prismaClient.teacher.findMany()

    return teachers.map((user) => Teacher.fromObject(user))
  }
}
