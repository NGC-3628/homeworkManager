import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Student } from '../../students/entities/student.entity';

@Entity('missing_homeworks')
export class Homework {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  subject: string; // La materia que seleccionarás en el popup

  @CreateDateColumn({ name: 'reported_at' })
  reportedAt: Date; // Guarda automáticamente la fecha y hora del reporte

  // Relación: Muchas tareas faltantes pertenecen a un solo alumno
  @ManyToOne(() => Student, (student) => student.missingHomeworks, {
    onDelete: 'CASCADE', // Si borras al alumno, se borran sus reportes
  })
  @JoinColumn({ name: 'student_id' })
  student: Student;
}