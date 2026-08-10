import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Homework } from '../../homework/entities/homework.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn('uuid') // Usamos UUIDs por seguridad y buenas prácticas
  id: string;

  @Column({ name: 'given_name' })
  givenName: string;

  @Column({ name: 'first_surname' })
  firstSurname: string;

  @Column({ name: 'second_surname', nullable: true }) // Nullable porque no todos tienen dos apellidos
  secondSurname: string;

  @Column()
  grade: number;

  @Column()
  section: string;

  // Relación: Un alumno puede tener muchas tareas faltantes
  @OneToMany(() => Homework, (homework) => homework.student)
  missingHomeworks: Homework[];
}