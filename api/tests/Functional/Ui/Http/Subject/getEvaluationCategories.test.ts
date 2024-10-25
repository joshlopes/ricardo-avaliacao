import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../../../../src/Infrastructure/DependencyInjection/types";
import {PrismaClient} from "@prisma/client";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import Teacher from "../../../../../src/Domain/Teacher/Teacher";
import SuperTestRequestBuilder from "../../../../Helper/SuperTestRequestBuilder";
import {
    createEvaluationCategory,
    createEvaluationSubtopic,
    createEvaluationTopic,
    createSubject
} from "../../../../Helper/StaticFixtures";

const prismaClient: PrismaClient = myContainer.get(TYPES.PrismaClient);

describe('POST /api/subject/:subjectId/year/:year/evaluation-categories', () => {
    beforeEach(async () => {
        await DatabaseUtil.truncateAllTables(prismaClient)
    });

    it('should find categories', async () => {
        const subject = await createSubject('Math');
        const evaluationCategory = await createEvaluationCategory('Numbers', subject, '5')
        const evaluationCategory2 = await createEvaluationCategory('Geometry', subject, '5')

        const additionTopic = await createEvaluationTopic('Addition', evaluationCategory)
        await createEvaluationSubtopic('Addition of two numbers', additionTopic)
        await createEvaluationSubtopic('Addition of three numbers', additionTopic)
        const subtractionTopic = await createEvaluationTopic('Subtraction', evaluationCategory)
        await createEvaluationSubtopic('Subtraction of two numbers', subtractionTopic)
        await createEvaluationSubtopic('Subtraction of three numbers', subtractionTopic)

        await createEvaluationTopic('Circles', evaluationCategory2)
        await createEvaluationTopic('Triangles', evaluationCategory2)

        const response = await SuperTestRequestBuilder
            .get(`/api/subject/${subject.id}/year/5/evaluation-categories`, true)
            .build();

        expect(response.status).toEqual(200);

        const categories = response.body;
        expect(categories.results).toHaveLength(2);
    });
});