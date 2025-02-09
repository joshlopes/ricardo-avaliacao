import 'reflect-metadata'
import { Container } from 'inversify'
import CommandHandlerManager from '../CommandHandler/CommandHandlerManager'
import { TYPES } from './types'
import { PrismaClient } from '@prisma/client'
import type TeacherRepository from '../../Domain/Teacher/TeacherRepository'
import OrmTeacherRepository from '../ORM/Teacher/OrmTeacherRepository'
import LoginCommandHandler from '../../Application/Query/Login/LoginCommandHandler'
import type SecurityProvider from '../../Domain/Security/SecurityProvider'
import JwtProvider from '../Security/Jwt/JwtProvider'
import { type PasswordEncoder } from '../../Domain/Security/PasswordEncoder'
import EventDispatcher from '../../Application/Event/EventDispatcher/EventDispatcher'
import CreateTeacher from '../../Ui/Console/CreateTeacher'
import UpsertTeacherCommandHandler from '../../Application/Write/Teacher/UpsertTeacher/UpsertTeacherCommandHandler'
import ListAllTeachersCommandHandler from '../../Application/Query/Teacher/ListAllTeachers/ListAllTeachersCommandHandler'
import DeleteTeacherCommandHandler from '../../Application/Write/Teacher/DeleteTeacher/DeleteTeacherCommandHandler'
import GetTeacherCommandHandler from '../../Application/Query/Teacher/GetTeacher/GetTeacherCommandHandler'
import AxiosHttpClient from '../Http/AxiosHttpClient'
import RetryAxiosHttpClient from '../Http/RetryAxiosHttpClient'
import { type HttpClient } from '../../Domain/Http/HttpClient'
import RefreshTokenCommandHandler from '../../Application/Query/RefreshToken/RefreshTokenCommandHandler'
import ConsoleLogProvider from '../Logger/ConsoleLogProvider'
import LoggerManager from '../../Application/Logger/LoggerManager'
import LokiLogProvider from '../Logger/LokiLogProvider'
import type Logger from '../../Application/Logger/Logger'
import { isEmpty } from '../../Application/Shared/StringTools'
import ArgonPasswordEncoder from '../Security/PasswordEncoder/ArgonPasswordEncoder'
import OrmStudentRepository from '../ORM/School/OrmStudentRepository'
import type StudentRepository from '../../Domain/School/StudentRepository'
import ListAllTeacherStudentsCommandHandler
  from '../../Application/Query/Teacher/ListAllTeacherStudents/ListAllTeacherStudentsCommandHandler'
import ListAllTeacherClassesCommandHandler
  from '../../Application/Query/Teacher/ListAllTeacherClasses/ListAllTeachersCommandHandler'
import OrmSchoolClassRepository from '../ORM/School/OrmSchoolClassRepository'
import type SchoolClassRepository from '../../Domain/School/SchoolClassRepository'
import type GradeRepository from '../../Domain/School/GradeRepository'
import OrmGradeRepository from '../ORM/School/OrmGradeRepository'
import GetStudentSubjectGradesCommandHandler
  from '../../Application/Query/Student/GetStudentGrades/GetStudentSubjectGradesCommandHandler'
import GetEvaluationCategoriesHandler
  from '../../Application/Query/Subject/GetEvaluationCategories/GetEvaluationCategoriesHandler'
import OrmEvaluationTopicsRepository from '../ORM/School/OrmEvaluationTopicsRepository'
import type EvaluationTopicRepository from '../../Domain/Evaluation/EvaluationTopicRepository'
import type EvaluationCategoryRepository from '../../Domain/Evaluation/EvaluationCategoryRepository'
import OrmEvaluationCategoryRepository from '../ORM/School/OrmEvaluationCategoryRepository'
import type SubjectRepository from '../../Domain/School/SubjectRepository'
import OrmSubjectRepository from '../ORM/School/OrmSubjectRepository'
import type EvaluationSubTopicRepository from '../../Domain/Evaluation/EvaluationSubTopicRepository'
import OrmEvaluationSubTopicsRepository from '../ORM/School/OrmEvaluationSubTopicsRepository'
import SetStudentGradeHandler from '../../Application/Write/Student/SetStudentGrade/SetStudentGradeHandler'
import CreateStudentHandler from '../../Application/Write/Student/CreateStudent/CreateStudentHandler'
import OrmClassStudentRepository from '../ORM/School/OrmClassStudentRepository'
import type ClassStudentRepository from '../../Domain/School/ClassStudentRepository'
import UpdateStudentHandler from '../../Application/Write/Student/UpdateStudent/UpdateStudentHandler'

const myContainer = new Container()

// Logger
myContainer.bind(ConsoleLogProvider).toSelf()

const loggerManager = new LoggerManager()
loggerManager.addProvider(myContainer.get(ConsoleLogProvider))
if (!isEmpty(process.env.LOKI_HOST)) {
  loggerManager.addProvider(new LokiLogProvider(
    String(process.env.LOKI_HOST),
    isEmpty(process.env.LOKI_AUTH) ? undefined : String(process.env.LOKI_AUTH)
  ))
}
myContainer.bind<Logger>(TYPES.Logger).toConstantValue(loggerManager.createLogger({}))

// Repositories
myContainer.bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(new PrismaClient())
myContainer.bind<TeacherRepository>(TYPES.TeacherRepository).to(OrmTeacherRepository)
myContainer.bind<StudentRepository>(TYPES.StudentRepository).to(OrmStudentRepository)
myContainer.bind<GradeRepository>(TYPES.GradeRepository).to(OrmGradeRepository)
myContainer.bind<EvaluationTopicRepository>(TYPES.EvaluationTopicRepository).to(OrmEvaluationTopicsRepository)
myContainer.bind<SchoolClassRepository>(TYPES.SchoolClassRepository).to(OrmSchoolClassRepository)
myContainer.bind<EvaluationCategoryRepository>(TYPES.EvaluationCategoryRepository).to(OrmEvaluationCategoryRepository)
myContainer.bind<SubjectRepository>(TYPES.SubjectRepository).to(OrmSubjectRepository)
myContainer.bind<EvaluationSubTopicRepository>(TYPES.EvaluationSubTopicRepository).to(OrmEvaluationSubTopicsRepository)
myContainer.bind<ClassStudentRepository>(TYPES.ClassStudentRepository).to(OrmClassStudentRepository)

// Command handlers
myContainer.bind(TYPES.CommandHandler).to(LoginCommandHandler)
myContainer.bind(TYPES.CommandHandler).to(UpsertTeacherCommandHandler)
myContainer.bind(TYPES.CommandHandler).to(ListAllTeachersCommandHandler)
myContainer.bind(TYPES.CommandHandler).to(DeleteTeacherCommandHandler)
myContainer.bind(TYPES.CommandHandler).to(GetTeacherCommandHandler)
myContainer.bind(TYPES.CommandHandler).to(RefreshTokenCommandHandler)
myContainer.bind(TYPES.CommandHandler).to(ListAllTeacherStudentsCommandHandler)
myContainer.bind(TYPES.CommandHandler).to(ListAllTeacherClassesCommandHandler)
myContainer.bind(TYPES.CommandHandler).to(GetStudentSubjectGradesCommandHandler)
myContainer.bind(TYPES.CommandHandler).to(GetEvaluationCategoriesHandler)
myContainer.bind(TYPES.CommandHandler).to(SetStudentGradeHandler)
myContainer.bind(TYPES.CommandHandler).to(CreateStudentHandler)
myContainer.bind(TYPES.CommandHandler).to(UpdateStudentHandler)
myContainer.bind<CommandHandlerManager>(CommandHandlerManager).toSelf()

// Events
myContainer.bind<EventDispatcher>(EventDispatcher).toSelf()

// Factories

// Security
myContainer.bind<SecurityProvider>(TYPES.SecurityProvider).to(JwtProvider)
myContainer.bind<PasswordEncoder>(TYPES.PasswordEncoder).to(ArgonPasswordEncoder)

// Services
myContainer.bind(AxiosHttpClient).toSelf()
myContainer.bind(RetryAxiosHttpClient).toSelf()
myContainer.bind<HttpClient>(TYPES.HttpClient).to(RetryAxiosHttpClient)

// Console Command
myContainer.bind<CreateTeacher>(CreateTeacher).toSelf()

export { myContainer }
