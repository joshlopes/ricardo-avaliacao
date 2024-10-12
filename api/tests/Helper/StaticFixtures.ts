import {myContainer} from "../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../src/Infrastructure/DependencyInjection/types";
import Teacher from "../../src/Domain/Teacher/Teacher";
import TeacherRepository from "../../src/Domain/Teacher/TeacherRepository";
import {TeacherId} from "../../src/Domain/Teacher/TeacherId";

export const createTeacher = async (
    email?: string
): Promise<Teacher> => {
    return myContainer.get<TeacherRepository>(TYPES.TeacherRepository)
        .upsert(new Teacher(
            TeacherId.generate(),
            email ?? 'test@example.com',
            'test',
            null,
            'password',
            'password'
        ));
}
