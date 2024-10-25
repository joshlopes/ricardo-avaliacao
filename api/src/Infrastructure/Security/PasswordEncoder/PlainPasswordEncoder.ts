import { PasswordEncoder } from '../../../Domain/Security/PasswordEncoder'
import { injectable } from 'inversify'

@injectable()
export default class PlainPasswordEncoder implements PasswordEncoder {
  public async hash (password: string): Promise<string> {
    return password
  }

  public async compare (password: string, hash: string): Promise<boolean> {
    return password === hash
  }
}
