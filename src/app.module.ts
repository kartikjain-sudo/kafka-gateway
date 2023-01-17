import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
