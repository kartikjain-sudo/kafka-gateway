export class RegisterUserEvent {
  constructor(
    public readonly email: string,
    public readonly dob: Date,
    public readonly username: string,
    public readonly password: string,
  ) {}

  toString(): string {
    return JSON.stringify({
        email: this.email,
        dob: this.dob,
        username: this.username,
        password: this.password,
    });
  }
}