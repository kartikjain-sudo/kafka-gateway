import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, OnModuleInit } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { ClientKafka } from '@nestjs/microservices';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('gateway')
export class GatewayController implements OnModuleInit {
  constructor(
    private readonly gatewayService: GatewayService,
    @Inject('REGISTRATION_SERVICE') private readonly registerClient: ClientKafka,
    ) {}

  onModuleInit() {
    this.registerClient.subscribeToResponseOf('register_user');
    this.registerClient.subscribeToResponseOf('update_user_password');
  }

  @Post('register')
  async register(@Body() registerUser: RegisterUserDto) : Promise<any> {
    return this.gatewayService.register(registerUser);
  }

  @Post('update')
  async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto): Promise<boolean> {
    return this.gatewayService.updatePassword(updatePasswordDto);
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
