import { inject, injectable } from 'inversify'
import { TYPES } from '../../DependencyInjection/types'
import { PrismaClient } from '@prisma/client'
import RecordNotFound from '../../../Domain/RecordNotFound'
import { TeacherId } from '../../../Domain/Teacher/TeacherId'
import SchoolClassRepository from '../../../Domain/School/SchoolClassRepository'
import SchoolClass, { SchoolClassArray } from '../../../Domain/School/SchoolClass'
import { SchoolClassId } from '../../../Domain/School/SchoolClassId'

@injectable()
export default class OrmSchoolClassRepository implements SchoolClassRepository {
  constructor (
    @inject(TYPES.PrismaClient) private readonly prismaClient: PrismaClient
  ) {
  }

  async findByTeacher (teacherId: TeacherId): Promise<SchoolClass[]> {
    const classes = await this.prismaClient.class.findMany({
      where: {
        ClassSubjectTeacher: {
          some: {
            teacherId: teacherId.toString()
          }
        }
      },
      include: {
        ClassSubjectTeacher: {
          include: {
            teacher: true,
            Subject: true,
            schoolClass: true
          }
        }
      }
    })

    return classes.map((schoolClass: SchoolClassArray) => SchoolClass.fromObject(schoolClass))
  }

  public async get (id: SchoolClassId): Promise<SchoolClass> {
    const schoolClass = await this.prismaClient.class.findUnique({
      where: { id: id.toString() }
    })

    if (schoolClass === null) {
      throw new RecordNotFound(`Student with "${id.toString()}" id not found`)
    }

    return SchoolClass.fromObject(schoolClass)
  }

  async upsert (schoolClass: SchoolClass): Promise<SchoolClass> {
    const data = {
      name: schoolClass.name,
      year: schoolClass.year
    }

    const upsertedObj = await this.prismaClient.class.upsert({
      where: { id: schoolClass.id.toString() },
      update: data,
      create: data
    })

    return SchoolClass.fromObject(upsertedObj)
  }

  async delete (id: TeacherId): Promise<void> {
    await this.prismaClient.student.delete({
      where: {
        id: id.toString()
      }
    })
  }

  async findAll (): Promise<SchoolClass[]> {
    const schoolClasses = await this.prismaClient.class.findMany()

    return schoolClasses.map((schoolClass: SchoolClassArray) => SchoolClass.fromObject(schoolClass))
  }
}
