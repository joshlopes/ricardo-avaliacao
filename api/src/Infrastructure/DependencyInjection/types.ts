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

  // Clients
  HttpClient: Symbol.for('HttpClient'),
  PrismaClient: Symbol.for('PrismaClient'),
  OracleClient: Symbol.for('OracleClient')

  // Services
}

export { TYPES }
