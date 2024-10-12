import { ConsoleCommand } from '../../Domain/Console/ConsoleCommand'
import { inject, injectable } from 'inversify'
import CommandHandlerManager from '../../Infrastructure/CommandHandler/CommandHandlerManager'
import UpsertTeacherCommand from '../../Application/Write/Teacher/UpsertTeacher/UpsertTeacherCommand'
import { TeacherId } from '../../Domain/Teacher/TeacherId'

@injectable()
export default class CreateTeacher implements ConsoleCommand {
  public static commandName = 'create-teacher'

  constructor (
    @inject(CommandHandlerManager) private readonly commandHandlerManager: CommandHandlerManager
  ) {
  }

  configureArgs (inputArgs: any): void {
  }

  public async run (inputArgs: any): Promise<number> {
    const email = inputArgs[0]
    const name = inputArgs[1]
    const rawPassword = inputArgs[2]

    await this.commandHandlerManager.handle(
      new UpsertTeacherCommand(
        TeacherId.generate(),
        email,
        name,
        rawPassword
      )
    )

    return 0
  }
}
