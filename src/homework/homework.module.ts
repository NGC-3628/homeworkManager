import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeworkService } from './homework.service';
import { HomeworkController } from './homework.controller';
import { Homework } from './entities/homework.entity';
import { Student } from '../students/entities/student.entity';

@Module({
  imports: 
  [
    TypeOrmModule.forFeature([Homework, Student])
  ],
  controllers: [HomeworkController],
  providers: [HomeworkService],
})
export class HomeworkModule {}