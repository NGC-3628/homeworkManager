import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  // 1. Método para sembrar la base de datos manualmente (Endpoint: /students/seed)
  async seedDatabase() {
    const count = await this.studentRepository.count();
    
    if (count === 0) {
      console.log('🌱 Sembrando base de datos con alumnos de prueba...');
      
      const seedStudents = [
        // Ejemplos de "Martinez"
        { givenName: 'Luis', firstSurname: 'Martinez', secondSurname: 'Hernandez', grade: 1, section: 'A' },
        { givenName: 'Ana Sofia', firstSurname: 'Martinez', secondSurname: 'Juarez', grade: 1, section: 'B' },
        { givenName: 'Enroque', firstSurname: 'Martinez', secondSurname: 'Zavala', grade: 2, section: 'A' },
        { givenName: 'Astrid', firstSurname: 'Hurtado', secondSurname: 'Martinez', grade: 3, section: 'C' },
        
        // Ejemplos de "Gonzales" y combinaciones con "Z"
        { givenName: 'Gonzalo', firstSurname: 'Alonso', secondSurname: 'Ramirez', grade: 1, section: 'A' },
        { givenName: 'Grettel', firstSurname: 'Gonzales', secondSurname: 'Frias', grade: 2, section: 'B' },
        { givenName: 'Isabella', firstSurname: 'Gonzales', secondSurname: 'Rosa', grade: 3, section: 'A' },
        { givenName: 'Mario', firstSurname: 'Rios', secondSurname: 'Gonzales', grade: 1, section: 'C' },
        { givenName: 'Ricardo', firstSurname: 'Flores', secondSurname: 'Magon', grade: 2, section: 'A' },
        
        // Ejemplos con "Z"
        { givenName: 'Zulema', firstSurname: 'Acebedo', secondSurname: 'Zamarripa', grade: 3, section: 'B' },
        { givenName: 'Arturo', firstSurname: 'Zapata', secondSurname: 'Graces', grade: 1, section: 'A' },
        { givenName: 'Jessica', firstSurname: 'Moreira', secondSurname: 'Zapata', grade: 2, section: 'C' }
      ];

      // Insertamos todos los alumnos en bloque
      await this.studentRepository.save(seedStudents);
      console.log('✅ Base de datos sembrada correctamente.');
      return { message: 'Base de datos sembrada correctamente' };
    }
    return { message: 'La base de datos ya contiene datos' };
  }

  // 2. Lógica de búsqueda con QueryBuilder (Endpoint: /students/search?q=...)
  async searchStudents(term: string): Promise<Student[]> {
    if (!term) return []; // Si no hay término, regresamos arreglo vacío

    const searchTerm = `${term}%`; // El % al final significa "que empiece con"

    const queryBuilder = this.studentRepository.createQueryBuilder('student');

    queryBuilder
      // Condición: Buscar en cualquiera de los 3 campos (ignorando mayúsculas/minúsculas con ILIKE)
      .where('student.givenName ILIKE :term', { term: searchTerm })
      .orWhere('student.firstSurname ILIKE :term', { term: searchTerm })
      .orWhere('student.secondSurname ILIKE :term', { term: searchTerm })
      
      // Columna virtual: Calculamos la prioridad usando un CASE de SQL
      .addSelect(`
        CASE 
          WHEN student.givenName ILIKE :term THEN 1
          WHEN student.firstSurname ILIKE :term THEN 2
          WHEN student.secondSurname ILIKE :term THEN 3
          ELSE 4
        END
      `, 'priority')
      
      // Ordenamiento: Primero por nuestra prioridad, luego alfabéticamente
      .orderBy('priority', 'ASC')
      .addOrderBy('student.givenName', 'ASC')
      .addOrderBy('student.firstSurname', 'ASC')
      .addOrderBy('student.secondSurname', 'ASC');

    // getMany() ejecuta la consulta y devuelve las entidades (ignorando la columna 'priority')
    return await queryBuilder.getMany();
  }

  // --- Métodos CRUD base generados por NestJS ---
  
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