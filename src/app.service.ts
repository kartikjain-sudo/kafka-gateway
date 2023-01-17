import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { RegisterUserDto } from './dto/register-user.dto';
import { RegisterUserEvent } from './events/register-user.event';

@Injectable()
export class AppService {
  constructor(
    @Inject('REGISTRATION_SERVICE') private readonly registerClient: ClientKafka,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async register(registerUser: RegisterUserDto): Promise<boolean> {
    const { email, dob, username, password } = registerUser;
    this.registerClient.send('register_user', new RegisterUserEvent(email, dob, username, password),).subscribe((user) => {
      console.log('Response received', user);
    }
    );
    return true;
  }
}
