import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';
import { HomeworkModule } from './homework/homework.module';

@Module({
  imports: [
    // 1. Carga las variables de entorno
    ConfigModule.forRoot({ isGlobal: true }),
    
    // 2. Configura la conexión a PostgreSQL
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),      
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      // IMPORTANTE: synchronize en true solo para desarrollo. 
      // Crea las tablas automáticamente en base a tus modelos.
      synchronize: true, 
    }),

    // Estos módulos los generó el CLI automáticamente
    UsersModule,
    StudentsModule,
    HomeworkModule,
  ],
})
export class AppModule {}