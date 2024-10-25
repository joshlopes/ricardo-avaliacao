import { inject, injectable } from 'inversify'
import { TYPES } from '../../DependencyInjection/types'
import {PrismaClient} from '@prisma/client'
import RecordNotFound from '../../../Domain/RecordNotFound'
import {StudentId} from "../../../Domain/School/StudentId";
import {SubjectId} from "../../../Domain/School/SubjectId";
import GradeRepository from "../../../Domain/School/GradeRepository";
import {GradeId} from "../../../Domain/School/GradeId";
import Grade from '../../../Domain/School/Grade';

@injectable()
export default class OrmGradeRepository implements GradeRepository {
    constructor (
        @inject(TYPES.PrismaClient) private readonly prismaClient: PrismaClient,
    ) {
    }

    async findBySubjectAndStudent(studentId: StudentId, subjectId: SubjectId): Promise<Grade[]> {
        const grades = await this.prismaClient.grade.findMany({
            where: {
                studentId: studentId.toString(),
                evaluationSubTopic: {
                    evaluationTopic: {
                        EvaluationCategory: {
                            subjectId: subjectId.toString()
                        }
                    }
                }
            },
            include: {
                student: true,
                evaluationSubTopic: {
                    include: {
                        evaluationTopic: {
                            include: {
                                EvaluationCategory: {
                                    include: {
                                        Subject: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        return grades.map((grade) => Grade.fromObject(grade))
    }

    public async get (id: GradeId): Promise<Grade> {
        const grade = await this.prismaClient.grade.findUnique({
            where: { id: id.toString() },
            include: {
                student: true,
                evaluationSubTopic: true,
            }
        })

        if (grade === null) {
            throw new RecordNotFound(`Grade with "${id.toString()}" id not found`)
        }

        return Grade.fromObject(grade)
    }

    async upsert (grade: Grade): Promise<Grade> {
        const data = {
            grade: grade.grade.toString(),
            student: {connect: {id: grade.student.id.toString()}},
            evaluationSubTopic: {connect: {id: grade.evaluationSubTopic.id.toString()}},
        };

        const upsertedObj = await this.prismaClient.grade.upsert({
            where: { id: grade.id.toString() },
            update: data,
            create: {
                createdAt: new Date(),
                ...data,
            },
            include: {
                student: true,
                evaluationSubTopic: true,
            }
        });

        return Grade.fromObject(upsertedObj);
    }

    async delete (id: GradeId): Promise<void> {
        await this.prismaClient.student.delete({
            where: {
                id: id.toString()
            }
        })
    }

    async findAll (): Promise<Grade[]> {
        const grades = await this.prismaClient.grade.findMany({
            include: {
                student: true,
                evaluationSubTopic: true,
            }
        })

        return grades.map((grade) => Grade.fromObject(grade))
    }
}
