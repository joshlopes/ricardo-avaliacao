import type Teacher from '../Teacher/Teacher'
import type Token from './Token'

export default interface SecurityProvider {
  generateTokens: (user: Teacher) => { accessToken: Token, refreshToken: Token }

  /**
     * @throws VerificationFailed
     */
  verifyToken: (token: Token) => Promise<Teacher>
}
