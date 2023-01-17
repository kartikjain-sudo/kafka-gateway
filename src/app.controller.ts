import { Body, Controller, Get, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AppService } from './app.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    private readonly appService: AppService,
    @Inject('REGISTRATION_SERVICE') private readonly registerClient: ClientKafka,
    ) {}

  onModuleInit() {
    this.registerClient.subscribeToResponseOf('register_user');
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('register')
  async register(@Body() registerUser: RegisterUserDto): Promise<boolean> {
    return this.appService.register(registerUser);
  }
}
