import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EtudiantsController } from './etudiants.controller';
import { EtudiantsService } from './etudiants.service';
import { Etudiant, EtudiantSchema } from './schemas/etudiant.schema';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Etudiant.name, schema: EtudiantSchema }]),
    CommonModule,
  ],
  controllers: [EtudiantsController],
  providers: [EtudiantsService],
  exports: [EtudiantsService],
})
export class EtudiantsModule {}