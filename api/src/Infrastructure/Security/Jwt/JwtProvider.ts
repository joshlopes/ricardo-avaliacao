import SecurityProvider from '../../../Domain/Security/SecurityProvider'
import Teacher from '../../../Domain/Teacher/Teacher'
import Token from '../../../Domain/Security/Token'
import jwt from 'jsonwebtoken'
import { inject, injectable } from 'inversify'
import { AuthenticatePayload } from '../../../Domain/Security/AuthenticatePayload'
import VerificationFailed from '../../../Domain/Security/VerificationFailed'
import { TYPES } from '../../DependencyInjection/types'
import TeacherRepository from '../../../Domain/Teacher/TeacherRepository'
import { TeacherId } from '../../../Domain/Teacher/TeacherId'

export interface SecurityTokens {
  accessToken: Token
  refreshToken: Token
}

@injectable()
export default class JwtProvider implements SecurityProvider {
  constructor (
    @inject(TYPES.TeacherRepository) private readonly userRepository: TeacherRepository
  ) {}

  generateTokens (user: Teacher): SecurityTokens {
    if (user.id === undefined) {
      throw new Error('Teacher id is required')
    }

    const authenticatePayload: AuthenticatePayload = {
      id: user.id.toString()
    }

    const token = jwt.sign(
      authenticatePayload,
      process.env.SECRET_TOKEN ?? 'secret',
      { expiresIn: '15m' }
    )
    const refreshToken = jwt.sign(
      authenticatePayload,
      process.env.SECRET_TOKEN ?? 'secret',
      { expiresIn: '7d' }
    )

    return {
      accessToken: new Token(token, new Date(Date.now() + 15 * 60 * 1000)),
      refreshToken: new Token(refreshToken, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
    }
  }

  async verifyToken (token: Token): Promise<Teacher> {
    try {
      const payload = jwt.verify(
        token.token,
        process.env.SECRET_TOKEN ?? 'secret'
      ) as AuthenticatePayload

      return await this.userRepository.get(TeacherId.fromString(payload.id))
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        throw VerificationFailed.tokenExpired()
      }

      throw VerificationFailed.failedToAuthenticate()
    }
  }
}
