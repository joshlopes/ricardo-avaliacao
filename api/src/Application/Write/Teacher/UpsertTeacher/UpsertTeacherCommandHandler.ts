import { inject, injectable } from 'inversify'
import UpsertTeacherCommand from './UpsertTeacherCommand'
import CommandHandler from '../../../../Domain/Command/CommandHandler'
import { TYPES } from '../../../../Infrastructure/DependencyInjection/types'
import TeacherRepository from '../../../../Domain/Teacher/TeacherRepository'
import Teacher from '../../../../Domain/Teacher/Teacher'

@injectable()
export default class UpsertTeacherCommandHandler implements CommandHandler<UpsertTeacherCommand> {
  constructor (
    @inject(TYPES.TeacherRepository) private readonly repository: TeacherRepository
  ) {
  }

  async handle (command: UpsertTeacherCommand): Promise<void> {
    await this.repository.upsert(
      new Teacher(
        command.id,
        command.email,
        command.name,
        null,
        '',
        command.rawPassword
      )
    )
  }
}
