import { inject, injectable } from 'inversify'
import { TYPES } from '../../DependencyInjection/types'
import { PrismaClient } from '@prisma/client'
import RecordNotFound from '../../../Domain/RecordNotFound'
import { TeacherId } from '../../../Domain/Teacher/TeacherId'
import StudentRepository from '../../../Domain/School/StudentRepository'
import { StudentId } from '../../../Domain/School/StudentId'
import Student, { StudentArray } from '../../../Domain/School/Student'
import { SchoolClassId } from '../../../Domain/School/SchoolClassId'
import { SubjectId } from '../../../Domain/School/SubjectId'

@injectable()
export default class OrmStudentRepository implements StudentRepository {
  constructor (
    @inject(TYPES.PrismaClient) private readonly prismaClient: PrismaClient
  ) {
  }

  async findByTeacher (teacherId: TeacherId, schoolClassId?: SchoolClassId, subjectId?: SubjectId): Promise<Student[]> {
    const students = await this.prismaClient.student.findMany({
      where: {
        classes: {
          some: {
            class: {
              ClassSubjectTeacher: {
                some: {
                  teacherId: teacherId.toString(),
                  ...(schoolClassId !== undefined ? { classId: schoolClassId.toString() } : {}),
                  ...(subjectId !== undefined ? { subjectId: subjectId.toString() } : undefined)
                }
              }
            }
          }
        }
      }
    })

    return students.map((student: StudentArray) => Student.fromObject(student))
  }

  public async get (id: StudentId): Promise<Student> {
    const student = await this.prismaClient.student.findUnique({
      where: { id: id.toString() }
    })

    if (student === null) {
      throw new RecordNotFound(`Student with "${id.toString()}" id not found`)
    }

    return Student.fromObject(student)
  }

  async upsert (student: Student): Promise<Student> {
    const data = {
      name: student.name
    }

    const upsertedStudent = await this.prismaClient.student.upsert({
      where: { id: student.id.toString() },
      update: data,
      create: data
    })

    return Student.fromObject(upsertedStudent)
  }

  async delete (id: TeacherId): Promise<void> {
    await this.prismaClient.student.delete({
      where: {
        id: id.toString()
      }
    })
  }

  async findAll (): Promise<Student[]> {
    const students = await this.prismaClient.student.findMany()

    return students.map((student: StudentArray) => Student.fromObject(student))
  }
}
