import { 
  Controller, 
  Get, 
  Post, 
  Patch, 
  Delete, 
  Body, 
  Param, 
  UseGuards, 
  UseInterceptors,
  UploadedFile,
  Query
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { EtudiantsService } from './etudiants.service';
import { CreateEtudiantDto } from './dto/create-etudiant.dto';
import { UpdateEtudiantDto } from './dto/update-etudiant.dto';
import { multerConfig } from '../common/config/multer.config';

@Controller('etudiants')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EtudiantsController {
  constructor(private readonly etudiantsService: EtudiantsService) {}

  @Post()
  @Roles(Role.ADMIN, Role.RESPONSABLE)
  async create(@Body() createEtudiantDto: CreateEtudiantDto) {
    return await this.etudiantsService.create(createEtudiantDto);
  }

  @Get()
  async findAll(@Query() filterQuery: any) {
    return await this.etudiantsService.findAll(filterQuery);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.etudiantsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.RESPONSABLE)
  async update(@Param('id') id: string, @Body() updateEtudiantDto: UpdateEtudiantDto) {
    return await this.etudiantsService.update(id, updateEtudiantDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async remove(@Param('id') id: string) {
    return await this.etudiantsService.remove(id);
  }

  @Post(':id/photo')
  @Roles(Role.ADMIN, Role.RESPONSABLE)
  @UseInterceptors(FileInterceptor('photo', multerConfig))
  async uploadPhoto(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return await this.etudiantsService.uploadPhoto(id, file);
  }
}