import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'; // <-- Agregamos Query aquí
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get('seed')
  seed() {
    return this.studentsService.seedDatabase();
  }

  @Get('search')
  search(@Query('q') q: string) { // <-- Ahora Query sí existe
    return this.studentsService.searchStudents(q);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id); // <-- Quitamos el '+'
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(id, updateStudentDto); // <-- Quitamos el '+'
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id); // <-- Quitamos el '+'
  }
}