import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IntervenantsService } from './intervenants.service';
import { IntervenantsController } from './intervenants.controller';
import { Intervenant, IntervenantSchema } from './schemas/intervenant.schema';
import { CommonModule } from '../common/common.module';  // Ajoutez cette ligne

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Intervenant.name, schema: IntervenantSchema }
    ]),
    CommonModule  // Ajoutez cette ligne
  ],
  controllers: [IntervenantsController],
  providers: [IntervenantsService],
  exports: [IntervenantsService]
})
export class IntervenantsModule {}