export class LoginDto {
  username: string
  password: string

  private constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }

  static createLoginWithCorrectData(): LoginDto {
    return new LoginDto('daniil_brd', 'Z3x4W5y6') // <-- замените на рабочие данные
  }

  static createLoginWithIncorrectData(): LoginDto {
    return new LoginDto('incorrect-username', 'incorrect-password')
  }

  static createLoginWithIncorrectDataTwo(): LoginDto {
    return new LoginDto('clown', '1446')
  }
}
