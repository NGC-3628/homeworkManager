import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  // Inyectamos el repositorio de Student
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  // Lógica de búsqueda con QueryBuilder
  async searchStudents(term: string): Promise<Student[]> {
    if (!term) return []; // Si no hay término, regresamos arreglo vacío

    const searchTerm = `${term}%`; // El % al final significa "que empiece con"

    const queryBuilder = this.studentRepository.createQueryBuilder('student');

    queryBuilder
      // 1. Condición: Buscar en cualquiera de los 3 campos (ignorando mayúsculas/minúsculas con ILIKE)
      .where('student.givenName ILIKE :term', { term: searchTerm })
      .orWhere('student.firstSurname ILIKE :term', { term: searchTerm })
      .orWhere('student.secondSurname ILIKE :term', { term: searchTerm })
      
      // 2. Columna virtual: Calculamos la prioridad usando un CASE de SQL
      .addSelect(`
        CASE 
          WHEN student.givenName ILIKE :term THEN 1
          WHEN student.firstSurname ILIKE :term THEN 2
          WHEN student.secondSurname ILIKE :term THEN 3
          ELSE 4
        END
      `, 'priority')
      
      // 3. Ordenamiento: Primero por nuestra prioridad, luego alfabéticamente
      .orderBy('priority', 'ASC')
      .addOrderBy('student.givenName', 'ASC')
      .addOrderBy('student.firstSurname', 'ASC')
      .addOrderBy('student.secondSurname', 'ASC');

    // getMany() ejecuta la consulta y devuelve las entidades (ignorando la columna 'priority' en el JSON final, lo cual es ideal)
    return await queryBuilder.getMany();
  }

  create(createStudentDto: any) {
    return 'This action adds a new student';
  }

  findAll() {
    return this.studentRepository.find();
  }

  findOne(id: string) {
    return this.studentRepository.findOneBy({ id });
  }

  update(id: string, updateStudentDto: any) {
    return `This action updates a #${id} student`;
  }

  remove(id: string) {
    return `This action removes a #${id} student`;
  }
}