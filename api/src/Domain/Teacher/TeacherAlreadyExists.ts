export default class TeacherAlreadyExists extends Error {
  constructor (username: string) {
    super(`User with username ${username} already exists`)
  }
}
