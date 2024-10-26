import { inject, injectable } from 'inversify'
import { TYPES } from '../../DependencyInjection/types'
import { PrismaClient } from '@prisma/client'
import RecordNotFound from '../../../Domain/RecordNotFound'
import ClassStudentRepository from '../../../Domain/School/ClassStudentRepository'
import { ClassStudentId } from '../../../Domain/School/ClassStudentId'
import ClassStudent, { ClassStudentArray } from '../../../Domain/School/ClassStudent'

@injectable()
export default class OrmClassStudentRepository implements ClassStudentRepository {
  constructor (
    @inject(TYPES.PrismaClient) private readonly prismaClient: PrismaClient
  ) {
  }

  public async get (id: ClassStudentId): Promise<ClassStudent> {
    const object = await this.prismaClient.classStudent.findUnique({
      where: { id: id.toString() }
    })

    if (object === null) {
      throw new RecordNotFound(`Class Student with "${id.toString()}" id not found`)
    }

    return ClassStudent.fromObject(object)
  }

  async create (classStudent: ClassStudent): Promise<ClassStudent> {
    if (classStudent.schoolClass === undefined || classStudent.student === undefined) {
      throw new Error('Class Student must have a school class and a student')
    }

    const upsertedObj = await this.prismaClient.classStudent.create({
      data: {
        id: classStudent.id.toString(),
        class: { connect: { id: classStudent.schoolClass.id.toString() } },
        student: { connect: { id: classStudent.student.id.toString() } }
      }
    })

    return ClassStudent.fromObject(upsertedObj)
  }

  async delete (id: ClassStudentId): Promise<void> {
    await this.prismaClient.classStudent.delete({
      where: {
        id: id.toString()
      }
    })
  }

  async findAll (): Promise<ClassStudent[]> {
    const schoolClasses = await this.prismaClient.classStudent.findMany()

    return schoolClasses.map((schoolClass: ClassStudentArray) => ClassStudent.fromObject(schoolClass))
  }
}
