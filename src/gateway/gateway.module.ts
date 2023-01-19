import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayController } from './gateway.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'REGISTRATION_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'registration',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'REGISTRATION_SERVICE_GROUP',
          },
        },
      },
    ])
  ],
  controllers: [GatewayController],
  providers: [GatewayService]
})
export class GatewayModule {}
