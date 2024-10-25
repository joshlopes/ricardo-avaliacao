import { inject, injectable } from 'inversify'
import { TYPES } from '../../DependencyInjection/types'
import { PrismaClient } from '@prisma/client'
import RecordNotFound from '../../../Domain/RecordNotFound'
import { SubjectId } from '../../../Domain/School/SubjectId'
import EvaluationCategoryRepository from '../../../Domain/Evaluation/EvaluationCategoryRepository'
import EvaluationCategory from '../../../Domain/Evaluation/EvaluationCategory'
import { EvaluationCategoryId } from '../../../Domain/Evaluation/EvaluationCategoryId'

@injectable()
export default class OrmEvaluationCategoryRepository implements EvaluationCategoryRepository {
  constructor (
    @inject(TYPES.PrismaClient) private readonly prismaClient: PrismaClient
  ) {
  }

  async findBySubjectAndYear (subjectId: SubjectId, year: string): Promise<EvaluationCategory[]> {
    const objects = await this.prismaClient.evaluationCategory.findMany({
      where: {
        subjectId: subjectId.toString(),
        year
      },
      include: {
        Subject: true,
        EvaluationTopics: {
          include: {
            subtopics: true,
            EvaluationCategory: {
              include: {
                Subject: true
              }
            }
          }
        }
      }
    })

    return objects.map((object) => EvaluationCategory.fromObject(object))
  }

  public async get (id: EvaluationCategoryId): Promise<EvaluationCategory> {
    const object = await this.prismaClient.evaluationCategory.findUnique({
      where: { id: id.toString() },
      include: {
        Subject: true
      }
    })

    if (object === null) {
      throw new RecordNotFound(`Grade with "${id.toString()}" id not found`)
    }

    return EvaluationCategory.fromObject(object)
  }

  async upsert (evaluationCategory: EvaluationCategory): Promise<EvaluationCategory> {
    const data = {
      name: evaluationCategory.name,
      year: evaluationCategory.year,
      subjectId: evaluationCategory.subject.id.toString()
    }

    const upsertedObj = await this.prismaClient.evaluationCategory.upsert({
      where: { id: evaluationCategory.id.toString() },
      update: data,
      create: data,
      include: {
        Subject: true
      }
    })

    return EvaluationCategory.fromObject(upsertedObj)
  }

  async delete (id: EvaluationCategoryId): Promise<void> {
    await this.prismaClient.evaluationCategory.delete({
      where: {
        id: id.toString()
      }
    })
  }

  async findAll (): Promise<EvaluationCategory[]> {
    const objects = await this.prismaClient.evaluationCategory.findMany({
      include: {
        Subject: true
      }
    })

    return objects.map((object) => EvaluationCategory.fromObject(object))
  }
}
