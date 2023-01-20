import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { RegisterUserEvent } from './events/register-user.event';
import { UpdatePasswordEvent } from './events/update-password.event';

@Injectable()
export class GatewayService {
  constructor(
    @Inject('REGISTRATION_SERVICE') private readonly registerClient: ClientKafka,
  ) {}

  async register(registerUser: RegisterUserDto) : Promise<any> {
    const { email, dob, username, password } = registerUser;
    this.registerClient.send('register_user', new RegisterUserEvent(email, dob, username, password),)
      .subscribe((user) => {
        console.log('Response received', user);
        return user;
      });
    
    // return val;
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<any> {
    let { username, currentPassword, newPassword } = updatePasswordDto;
    this.registerClient.send('update_user_password', new UpdatePasswordEvent(username, currentPassword, newPassword),)
      .subscribe((user) => {
        console.log('Response received', user);
        return user;
      });
    // return 'This action adds a new gateway';
  }

  // findAll() {
  //   return `This action returns all gateway`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} gateway`;
  // }

  // update(id: number, updateGatewayDto: UpdateGatewayDto) {
  //   return `This action updates a #${id} gateway`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} gateway`;
  // }
}
