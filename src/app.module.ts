import { UserEntity } from './user/entities/user.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FilesModule } from './files/files.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './files/entities/file.entity';
import {ConfigModule} from '@nestjs/config'
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [UserEntity, FileEntity],
    synchronize: true,
  }),
  UserModule, 
  FilesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
