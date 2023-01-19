import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { ClientKafka } from '@nestjs/microservices';

@Controller('gateway')
export class GatewayController {
  constructor(
    private readonly gatewayService: GatewayService,
    @Inject('REGISTRATION_SERVICE') private readonly registerClient: ClientKafka,
    ) {}

  onModuleInit() {
    this.registerClient.subscribeToResponseOf('register_user');
  }

  @Post('register')
  async register(@Body() registerUser: RegisterUserDto): Promise<boolean> {
    return this.gatewayService.register(registerUser);
  }


  // @Post()
  // create(@Body() createGatewayDto: RegisterUserDto) {
  //   return this.gatewayService.create(createGatewayDto);
  // }

  // @Get()
  // findAll() {
  //   return this.gatewayService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.gatewayService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGatewayDto: UpdateGatewayDto) {
  //   return this.gatewayService.update(+id, updateGatewayDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.gatewayService.remove(+id);
  // }
}
