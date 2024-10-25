import { inject, injectable } from 'inversify'
import { TYPES } from '../../DependencyInjection/types'
import { PrismaClient } from '@prisma/client'
import RecordNotFound from '../../../Domain/RecordNotFound'
import EvaluationSubTopicRepository from "../../../Domain/Evaluation/EvaluationSubTopicRepository";
import {EvaluationSubTopicId} from "../../../Domain/Evaluation/EvaluationSubTopicId";
import EvaluationSubTopic from "../../../Domain/Evaluation/EvaluationSubTopic";

@injectable()
export default class OrmEvaluationSubTopicsRepository implements EvaluationSubTopicRepository {
  constructor (
    @inject(TYPES.PrismaClient) private readonly prismaClient: PrismaClient
  ) {
  }

  public async get (id: EvaluationSubTopicId): Promise<EvaluationSubTopic> {
    const subject = await this.prismaClient.evaluationSubTopic.findUnique({
      where: { id: id.toString() }
    })

    if (subject === null) {
      throw new RecordNotFound(`Evaluation subtopic with "${id.toString()}" id not found`)
    }

    return EvaluationSubTopic.fromObject(subject)
  }

  async upsert (object: EvaluationSubTopic): Promise<EvaluationSubTopic> {
    if (object.evaluationTopic === undefined) {
      throw new Error('Evaluation topic is required')
    }

    const data = {
      name: object.name,
      evaluationTopicId: object.evaluationTopic.id.toString()
    }

    const upsertedObj = await this.prismaClient.evaluationSubTopic.upsert({
      where: { id: object.id.toString() },
      update: data,
      create: {
        ...data
      },
    })

    return EvaluationSubTopic.fromObject(upsertedObj)
  }

  async delete (id: EvaluationSubTopicId): Promise<void> {
    await this.prismaClient.evaluationSubTopic.delete({
      where: {
        id: id.toString()
      }
    })
  }

  async findAll (): Promise<EvaluationSubTopic[]> {
    const objects = await this.prismaClient.evaluationSubTopic.findMany()

    return objects.map((object) => EvaluationSubTopic.fromObject(object))
  }
}
