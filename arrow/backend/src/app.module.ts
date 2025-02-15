import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { IntervenantsModule } from './intervenants/intervenants.module';
import { CommonModule } from './common/common.module';
import { AdminModule } from './admin/admin.module';
import { EtudiantsModule } from './etudiants/etudiants.module'; // Corriger cet import

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/arrow'),
    AuthModule,
    IntervenantsModule,
    CommonModule,
    AdminModule,
    EtudiantsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}