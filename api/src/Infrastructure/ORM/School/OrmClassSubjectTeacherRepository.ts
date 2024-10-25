import { inject, injectable } from 'inversify'
import { TYPES } from '../../DependencyInjection/types'
import { PrismaClient } from '@prisma/client'
import RecordNotFound from '../../../Domain/RecordNotFound'
import { TeacherId } from '../../../Domain/Teacher/TeacherId'
import { ClassSubjectTeacherId } from '../../../Domain/School/ClassSubjectTeacherId'
import ClassSubjectTeacherRepository from '../../../Domain/School/ClassSubjectTeacherRepository'
import ClassSubjectTeacher, { ClassSubjectTeacherArray } from '../../../Domain/School/ClassSubjectTeacher'

@injectable()
export default class OrmClassSubjectTeacherRepository implements ClassSubjectTeacherRepository {
  constructor (
    @inject(TYPES.PrismaClient) private readonly prismaClient: PrismaClient
  ) {
  }

  async findByTeacher (teacherId: TeacherId): Promise<ClassSubjectTeacher[]> {
    const classes = await this.prismaClient.classSubjectTeacher.findMany({
      where: {
        teacherId: teacherId.toString()
      },
      include: {
        schoolClass: true,
        Subject: true,
        teacher: true
      }
    })

    return classes.map((classSubjectTeacher: ClassSubjectTeacherArray) => ClassSubjectTeacher.fromObject(classSubjectTeacher))
  }

  public async get (id: ClassSubjectTeacherId): Promise<ClassSubjectTeacher> {
    const classSubjectTeacher = await this.prismaClient.classSubjectTeacher.findUnique({
      where: { id: id.toString() },
      include: {
        schoolClass: true,
        Subject: true,
        teacher: true
      }
    })

    if (classSubjectTeacher === null) {
      throw new RecordNotFound(`Student with "${id.toString()}" id not found`)
    }

    return ClassSubjectTeacher.fromObject(classSubjectTeacher)
  }

  async upsert (classSubjectTeacher: ClassSubjectTeacher): Promise<ClassSubjectTeacher> {
    const data = {
      teacher: { connect: { id: classSubjectTeacher.teacher.id.toString() } },
      schoolClass: { connect: { id: classSubjectTeacher.schoolClass.id.toString() } },
      Subject: { connect: { id: classSubjectTeacher.subject.id.toString() } }
    }

    const upsertedObj = await this.prismaClient.classSubjectTeacher.upsert({
      where: { id: classSubjectTeacher.id.toString() },
      update: data,
      create: data,
      include: {
        schoolClass: true,
        Subject: true,
        teacher: true
      }
    })

    return ClassSubjectTeacher.fromObject(upsertedObj)
  }

  async delete (id: TeacherId): Promise<void> {
    await this.prismaClient.student.delete({
      where: {
        id: id.toString()
      }
    })
  }

  async findAll (): Promise<ClassSubjectTeacher[]> {
    const classSubjectTeachers = await this.prismaClient.classSubjectTeacher.findMany({
      include: {
        schoolClass: true,
        teacher: true,
        Subject: true
      }
    })

    return classSubjectTeachers.map((classSubjectTeacher: ClassSubjectTeacherArray) => ClassSubjectTeacher.fromObject(classSubjectTeacher))
  }
}
