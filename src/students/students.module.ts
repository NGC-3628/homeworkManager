import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- 1. Importar TypeOrmModule
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Student } from './entities/student.entity'; // <-- 2. Importar tu entidad
import { Homework } from '../homework/entities/homework.entity'; // <-- 1. Importa Homework

@Module({
  imports: 
  [TypeOrmModule.forFeature([Student, Homework])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}