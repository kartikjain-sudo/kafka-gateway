import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: "postgres",
          host: 'localhost',
          port: 5432,
          username: "postgres",
          password: "postgres",
          database: 'register',
          entities: [__dirname + "/../**/entity/*.entity.{ts,js}"],
          autoLoadEntities: true,
          synchronize: true,
          retryAttempts: 2,
        };
      },
    }),
  ],
})
export class DbModule {}