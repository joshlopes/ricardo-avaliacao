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
import SubTopicRepository from "../../src/Domain/Evaluation/SubTopicRepository";
import {SubTopicId} from "../../src/Domain/Evaluation/SubTopicId";
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
import SubTopic from "../../src/Domain/Evaluation/SubTopic";

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
    year?: string
): Promise<Subject> => {
    return myContainer.get<SubjectRepository>(TYPES.SubjectRepository)
        .upsert(new Subject(
            SubjectId.generate(),
            name ?? 'Math',
            year ?? '2023'
        ));
};

export const createEvaluationTopic = async (
    name?: string,
    subject?: Subject,
    year?: string
): Promise<EvaluationTopic> => {
    const resolvedName = name ?? 'Understanding Numbers';

    return myContainer.get<EvaluationTopicRepository>(TYPES.EvaluationTopicRepository)
        .upsert(new EvaluationTopic(
            EvaluationTopicId.generate(),
            resolvedName,
            year ?? '2023',
        ));
};

export const createSubTopic = async (
    name?: string,
    evaluationTopic?: EvaluationTopic
): Promise<SubTopic> => {
    const resolvedName = name ?? 'Is able to add and subtract numbers';
    const resolvedEvaluationTopic = evaluationTopic ?? await createEvaluationTopic();

    return myContainer.get<SubTopicRepository>(TYPES.SubTopicRepository)
        .upsert(new SubTopic(
            SubTopicId.generate(),
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
    subTopic?: SubTopic,
    student?: Student,
    schoolClass?: SchoolClass
): Promise<Grade> => {
    const resolvedSubTopic = subTopic ?? await createSubTopic();
    const resolvedStudent = student ?? await createStudent();
    const resolvedSchoolClass = schoolClass ?? await createSchoolClass();

    return myContainer.get<GradeRepository>(TYPES.GradeRepository)
        .upsert(new Grade(
            GradeId.generate(),
            grade ?? GradeEnum.NOT_WORKED,
            resolvedSubTopic,
            resolvedStudent,
            resolvedSchoolClass,
        ));
};
