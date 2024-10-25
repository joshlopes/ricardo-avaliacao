import { inject, injectable } from 'inversify'
import { TYPES } from '../../DependencyInjection/types'
import { PrismaClient } from '@prisma/client'
import RecordNotFound from '../../../Domain/RecordNotFound'
import SubjectRepository from '../../../Domain/School/SubjectRepository'
import { SubjectId } from '../../../Domain/School/SubjectId'
import Subject from '../../../Domain/School/Subject'

@injectable()
export default class OrmSubjectRepository implements SubjectRepository {
  constructor (
    @inject(TYPES.PrismaClient) private readonly prismaClient: PrismaClient
  ) {
  }

  public async get (id: SubjectId): Promise<Subject> {
    const subject = await this.prismaClient.subject.findUnique({
      where: { id: id.toString() }
    })

    if (subject === null) {
      throw new RecordNotFound(`Subject with "${id.toString()}" id not found`)
    }

    return Subject.fromObject(subject)
  }

  async upsert (subject: Subject): Promise<Subject> {
    const data = {
      name: subject.name
    }

    const upsertedObj = await this.prismaClient.subject.upsert({
      where: { id: subject.id.toString() },
      update: data,
      create: {
        ...data
      }
    })

    return Subject.fromObject(upsertedObj)
  }

  async delete (id: SubjectId): Promise<void> {
    await this.prismaClient.subject.delete({
      where: {
        id: id.toString()
      }
    })
  }

  async findAll (): Promise<Subject[]> {
    const objects = await this.prismaClient.subject.findMany()

    return objects.map((object) => Subject.fromObject(object))
  }
}
