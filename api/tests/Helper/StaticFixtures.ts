import {myContainer} from "../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../src/Infrastructure/DependencyInjection/types";
import Teacher from "../../src/Domain/Teacher/Teacher";
import TeacherRepository from "../../src/Domain/Teacher/TeacherRepository";
import {TeacherId} from "../../src/Domain/Teacher/TeacherId";
import SchoolClass from "../../src/Domain/School/SchoolClass";
import SchoolClassRepository from "../../src/Domain/School/SchoolClassRepository";
import {SchoolClassId} from "../../src/Domain/School/SchoolClassId";
import SubjectRepository from "../../src/Domain/School/SubjectRepository";
import {SubjectId} from "../../src/Domain/School/SubjectId";
import EvaluationTopicRepository from "../../src/Domain/Evaluation/EvaluationTopicRepository";
import EvaluationSubTopicRepository from "../../src/Domain/Evaluation/EvaluationSubTopicRepository";
import {EvaluationSubTopicId} from "../../src/Domain/Evaluation/EvaluationSubTopicId";
import StudentRepository from "../../src/Domain/School/StudentRepository";
import Student from "../../src/Domain/School/Student";
import {StudentId} from "../../src/Domain/School/StudentId";
import ClassStudentRepository from "../../src/Domain/School/ClassStudentRepository";
import ClassStudent from "../../src/Domain/School/ClassStudent";
import {ClassStudentId} from "../../src/Domain/School/ClassStudentId";
import GradeRepository from "../../src/Domain/School/GradeRepository";
import Grade, {GradeEnum} from "../../src/Domain/School/Grade";
import {GradeId} from "../../src/Domain/School/GradeId";
import Subject from "../../src/Domain/School/Subject";
import EvaluationTopic from "../../src/Domain/Evaluation/EvaluationTopic";
import {EvaluationTopicId} from "../../src/Domain/Evaluation/EvaluationTopicId";
import EvaluationSubTopic from "../../src/Domain/Evaluation/EvaluationSubTopic";
import EvaluationCategoryRepository from "../../src/Domain/Evaluation/EvaluationCategoryRepository";
import EvaluationCategory from "../../src/Domain/Evaluation/EvaluationCategory";
import {EvaluationCategoryId} from "../../src/Domain/Evaluation/EvaluationCategoryId";

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

export const createSchoolClass = async (
    name?: string,
    year?: string
): Promise<SchoolClass> => {
    const resolvedName = name ?? '5A';
    const resolvedYear = year ?? '2023';

    return myContainer.get<SchoolClassRepository>(TYPES.SchoolClassRepository)
        .upsert(new SchoolClass(
            SchoolClassId.generate(),
            resolvedName,
            resolvedYear
        ));
};

export const createSubject = async (
    name?: string,
): Promise<Subject> => {
    return myContainer.get<SubjectRepository>(TYPES.SubjectRepository)
        .upsert(new Subject(
            SubjectId.generate(),
            name ?? 'Math',
        ));
};

export const createEvaluationCategory = async (
    name?: string,
    subject?: Subject,
    year?: string,
): Promise<EvaluationCategory> => {
    return myContainer.get<EvaluationCategoryRepository>(TYPES.EvaluationCategoryRepository)
        .upsert(new EvaluationCategory(
            EvaluationCategoryId.generate(),
            name ?? 'Numbers',
            year ?? '5',
            subject ?? await createSubject()
        ));
}

export const createEvaluationTopic = async (
    name?: string,
    category?: EvaluationCategory
): Promise<EvaluationTopic> => {
    const resolvedName = name ?? 'Understanding Numbers';

    return myContainer.get<EvaluationTopicRepository>(TYPES.EvaluationTopicRepository)
        .upsert(new EvaluationTopic(
            EvaluationTopicId.generate(),
            resolvedName,
            category ?? await createEvaluationCategory()
        ));
};

export const createEvaluationSubtopic = async (
    name?: string,
    evaluationTopic?: EvaluationTopic
): Promise<EvaluationSubTopic> => {
    const resolvedName = name ?? 'Is able to add and subtract numbers';
    const resolvedEvaluationTopic = evaluationTopic ?? await createEvaluationTopic();

    return myContainer.get<EvaluationSubTopicRepository>(TYPES.EvaluationSubTopicRepository)
        .upsert(new EvaluationSubTopic(
            EvaluationSubTopicId.generate(),
            resolvedName,
            resolvedEvaluationTopic
        ));
};

export const createStudent = async (
    name?: string
): Promise<Student> => {
    const resolvedName = name ?? 'John Doe';

    return myContainer.get<StudentRepository>(TYPES.StudentRepository)
        .upsert(new Student(
            StudentId.generate(),
            resolvedName
        ));
};

export const createClassStudent = async (
    schoolClass?: SchoolClass,
    student?: Student
): Promise<ClassStudent> => {
    const resolvedSchoolClass = schoolClass ?? await createSchoolClass();
    const resolvedStudent = student ?? await createStudent();

    return myContainer.get<ClassStudentRepository>(TYPES.ClassStudentRepository)
        .upsert(new ClassStudent(
            ClassStudentId.generate(),
            resolvedSchoolClass,
            resolvedStudent
        ));
};

export const createGrade = async (
    grade?: GradeEnum,
    subTopic?: EvaluationSubTopic,
    student?: Student,
): Promise<Grade> => {
    const resolvedSubTopic = subTopic ?? await createEvaluationSubtopic();
    const resolvedStudent = student ?? await createStudent();

    return myContainer.get<GradeRepository>(TYPES.GradeRepository)
        .upsert(new Grade(
            GradeId.generate(),
            grade ?? GradeEnum.NOT_WORKED,
            resolvedSubTopic,
            resolvedStudent,
        ));
};
