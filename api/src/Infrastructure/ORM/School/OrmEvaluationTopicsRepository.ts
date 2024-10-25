import { inject, injectable } from 'inversify'
import { TYPES } from '../../DependencyInjection/types'
import { PrismaClient } from '@prisma/client'
import RecordNotFound from '../../../Domain/RecordNotFound'
import { SubjectId } from '../../../Domain/School/SubjectId'
import EvaluationTopicRepository from '../../../Domain/Evaluation/EvaluationTopicRepository'
import EvaluationTopic from '../../../Domain/Evaluation/EvaluationTopic'
import { EvaluationTopicId } from '../../../Domain/Evaluation/EvaluationTopicId'

@injectable()
export default class OrmEvaluationTopicsRepository implements EvaluationTopicRepository {
  constructor (
    @inject(TYPES.PrismaClient) private readonly prismaClient: PrismaClient
  ) {
  }

  async findBySubjectAndYear (subjectId: SubjectId, year: string): Promise<EvaluationTopic[]> {
    const objects = await this.prismaClient.evaluationTopic.findMany({
      where: {
        EvaluationCategory: {
          subjectId: subjectId.toString(),
          year: year
        }
      },
      include: {
        EvaluationCategory: {
          include: {
            Subject: true
          }
        },
        subtopics: true
      }
    })

    return objects.map((object) => EvaluationTopic.fromObject(object))
  }

  public async get (id: EvaluationTopicId): Promise<EvaluationTopic> {
    const object = await this.prismaClient.evaluationTopic.findUnique({
      where: { id: id.toString() },
      include: {
        EvaluationCategory: {
          include: {
            Subject: true
          }
        }
      }
    })

    if (object === null) {
      throw new RecordNotFound(`Grade with "${id.toString()}" id not found`)
    }

    return EvaluationTopic.fromObject(object)
  }

  async upsert (evaluationTopic: EvaluationTopic): Promise<EvaluationTopic> {
    const data = {
      name: evaluationTopic.name,
      evaluationCategoryId: evaluationTopic.evaluationCategory.id.toString(),
    }

    const upsertedObj = await this.prismaClient.evaluationTopic.upsert({
      where: { id: evaluationTopic.id.toString() },
      update: data,
      create: data,
      include: {
        EvaluationCategory: {
          include: {
            Subject: true
          }
        }
      }
    })

    return EvaluationTopic.fromObject(upsertedObj)
  }

  async delete (id: EvaluationTopicId): Promise<void> {
    await this.prismaClient.evaluationTopic.delete({
      where: {
        id: id.toString()
      }
    })
  }

  async findAll (): Promise<EvaluationTopic[]> {
    const objects = await this.prismaClient.evaluationTopic.findMany({
      include: {
        EvaluationCategory: {
          include: {
            Subject: true
          }
        },
        subtopics: true
      }
    })

    return objects.map((object) => EvaluationTopic.fromObject(object))
  }
}
