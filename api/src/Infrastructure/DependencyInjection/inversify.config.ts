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
import ArgonPasswordEncoder from "../Security/PasswordEncoder/ArgonPasswordEncoder";
import OrmStudentRepository from "../ORM/School/OrmStudentRepository";
import StudentRepository from "../../Domain/School/StudentRepository";
import ListAllTeacherStudentsCommandHandler
  from "../../Application/Query/Teacher/ListAllTeacherStudents/ListAllTeacherStudentsCommandHandler";
import ListAllTeacherClassesCommandHandler
  from "../../Application/Query/Teacher/ListAllTeacherClasses/ListAllTeachersCommandHandler";
import OrmSchoolClassRepository from "../ORM/School/OrmSchoolClassRepository";
import SchoolClassRepository from "../../Domain/School/SchoolClassRepository";

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
myContainer.bind<SchoolClassRepository>(TYPES.SchoolClassRepository).to(OrmSchoolClassRepository)

// Command handlers
myContainer.bind(TYPES.CommandHandler).to(LoginCommandHandler)
myContainer.bind(TYPES.CommandHandler).to(UpsertTeacherCommandHandler)
myContainer.bind(TYPES.CommandHandler).to(ListAllTeachersCommandHandler)
myContainer.bind(TYPES.CommandHandler).to(DeleteTeacherCommandHandler)
myContainer.bind(TYPES.CommandHandler).to(GetTeacherCommandHandler)
myContainer.bind(TYPES.CommandHandler).to(RefreshTokenCommandHandler)
myContainer.bind(TYPES.CommandHandler).to(ListAllTeacherStudentsCommandHandler)
myContainer.bind(TYPES.CommandHandler).to(ListAllTeacherClassesCommandHandler)
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
