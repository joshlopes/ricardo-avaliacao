const TYPES = {
  // Generics
  CommandHandler: Symbol.for('CommandHandler'),
  EventHandler: Symbol.for('EventHandler'),
  Logger: Symbol.for('Logger'),

  // Security
  SecurityProvider: Symbol.for('SecurityProvider'),
  PasswordEncoder: Symbol.for('PasswordEncoder'),

  // Factories

  // Repositories
  TeacherRepository: Symbol.for('TeacherRepository'),
  SchoolClassRepository: Symbol.for('SchoolClassRepository'),
  SubjectRepository: Symbol.for('SubjectRepository'),
  EvaluationCategoryRepository: Symbol.for('EvaluationCategoryRepository'),
  EvaluationTopicRepository: Symbol.for('EvaluationTopicRepository'),
  SubTopicRepository: Symbol.for('SubTopicRepository'),
  GradeRepository: Symbol.for('GradeRepository'),
  StudentRepository: Symbol.for('StudentRepository'),
  ClassStudentRepository: Symbol.for('ClassStudentRepository'),
  ClassSubjectTeacherRepository: Symbol.for('ClassSubjectTeacherRepository'),

  // Clients
  HttpClient: Symbol.for('HttpClient'),
  PrismaClient: Symbol.for('PrismaClient'),
  OracleClient: Symbol.for('OracleClient')

  // Services
}

export { TYPES }
