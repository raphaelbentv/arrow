import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthSeeder implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async onModuleInit() {
    const adminExists = await this.userModel.findOne({ email: 'admin@arrow.com' });
    
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await this.userModel.create({
        email: 'admin@arrow.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Admin user created successfully');
    }
  }
}