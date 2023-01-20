import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { RegisterUserDto } from './dto/register-user.dto';
import { RegisterUserEvent } from './events/register-user.event';

@Injectable()
export class GatewayService {
  constructor(
    @Inject('REGISTRATION_SERVICE') private readonly registerClient: ClientKafka,
  ) {}

  async register(registerUser: RegisterUserDto) : Promise<any> {
    const { email, dob, username, password } = registerUser;
      this.registerClient.send('register_user', new RegisterUserEvent(email, dob, username, password),).subscribe((user) => {
        console.log('Response received', user);
        return user;
      }
      );
    // console.log({val1: JSON.stringify(val), val: val.closed})//val.destination.partialObserver});
    
    // return true;
  }

  // create(createGatewayDto: CreateGatewayDto) {
  //   return 'This action adds a new gateway';
  // }

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
