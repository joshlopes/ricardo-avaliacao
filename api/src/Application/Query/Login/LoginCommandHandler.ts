import CommandHandler from '../../../Domain/Command/CommandHandler'
import LoginCommand from './LoginCommand'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../../Infrastructure/DependencyInjection/types'
import TeacherRepository from '../../../Domain/Teacher/TeacherRepository'
import PasswordNotMatch from './PasswordNotMatch'
import Teacher from '../../../Domain/Teacher/Teacher'
import SecurityProvider from '../../../Domain/Security/SecurityProvider'
import Token from '../../../Domain/Security/Token'
import { PasswordEncoder } from '../../../Domain/Security/PasswordEncoder'

export interface LoginCommandHandlerResult {
  user: Teacher
  accessToken: Token
  refreshToken: Token
}

@injectable()
export default class LoginCommandHandler implements CommandHandler<LoginCommand> {
  constructor (
    @inject(TYPES.TeacherRepository) private readonly userRepository: TeacherRepository,
    @inject(TYPES.SecurityProvider) private readonly securityProvider: SecurityProvider,
    @inject(TYPES.PasswordEncoder) private readonly passwordEncoder: PasswordEncoder
  ) {
  }

  public async handle (command: LoginCommand): Promise<LoginCommandHandlerResult> {
    const teacher = await this.userRepository.getByEmail(command.username)
    if (teacher.password === undefined) {
      throw new PasswordNotMatch('Teacher is not allowed to login with password')
    }
    if (!await this.passwordEncoder.compare(command.password, teacher.password)) {
      throw new PasswordNotMatch('Password not match')
    }

    return {
      user: teacher,
      ...this.securityProvider.generateTokens(teacher)
    }
  }
}
