import { PasswordEncoder } from '../../../Domain/Security/PasswordEncoder'
import { injectable } from 'inversify'
import bcrypt from 'bcrypt'

@injectable()
export default class BcryptPasswordEncoder implements PasswordEncoder {
  public async hash (password: string): Promise<string> {
    return await bcrypt.hash(password, 10)
  }

  public async compare (password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(hash, password)
  }
}
