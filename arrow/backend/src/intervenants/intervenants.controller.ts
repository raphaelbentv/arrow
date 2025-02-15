// src/intervenants/intervenants.controller.ts

import { Controller, Get, Post, Patch, Delete, UseInterceptors, UploadedFile, UploadedFiles, Param, Body, UseGuards, Query } from '@nestjs/common';
import { FileInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../common/config/multer.config';
import { IntervenantsService } from './intervenants.service';
import { FileService } from '../common/services/file.service';
import { CreateIntervenantDto } from './dto/create-intervenant.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { documentsMulterConfig } from '../common/config/documents.multer.config';
import { UpdateIntervenantDto } from './dto/update-intervenant.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../auth/enums/role.enum';
import { FilterIntervenantDto } from './dto/filter-intervenant.dto';
import { CreateDisponibiliteDto } from './dto/create-disponibilite.dto';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { CreateModuleDto } from './dto/create-module.dto';

@Controller('intervenants')
@UseGuards(JwtAuthGuard, RolesGuard)
export class IntervenantsController {
  constructor(
    private readonly intervenantsService: IntervenantsService,
    private readonly fileService: FileService,
  ) {}

  @Post()
  @Roles(Role.ADMIN, Role.RESPONSABLE)
  async create(@Body() createIntervenantDto: CreateIntervenantDto) {
    return await this.intervenantsService.create(createIntervenantDto);
  }

  @Get()
  async findAll(@Query() filterDto: FilterIntervenantDto) {
    return await this.intervenantsService.findAll(filterDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.intervenantsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateIntervenantDto: UpdateIntervenantDto) {
    return await this.intervenantsService.update(id, updateIntervenantDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async remove(@Param('id') id: string) {
    return await this.intervenantsService.remove(id);
  }

  @Post(':id/photo')
  @UseInterceptors(FileInterceptor('photo', multerConfig))
  async uploadPhoto(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.intervenantsService.updatePhoto(id, file);
  }

  @Post(':id/documents')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'cv', maxCount: 1 },
      { name: 'pieceIdentite', maxCount: 1 },
      { name: 'diplomes', maxCount: 5 },
      { name: 'rib', maxCount: 1 },
      { name: 'kbis', maxCount: 1 },
      { name: 'assurance', maxCount: 1 },
    ], documentsMulterConfig)
  )
  async uploadDocuments(
    @Param('id') id: string,
    @UploadedFiles() files: { 
      cv?: Express.Multer.File[],
      pieceIdentite?: Express.Multer.File[],
      diplomes?: Express.Multer.File[],
      rib?: Express.Multer.File[],
      kbis?: Express.Multer.File[],
      assurance?: Express.Multer.File[],
    },
  ) {
    return this.intervenantsService.updateDocuments(id, files);
  }

  @Post(':id/disponibilites')
  @Roles(Role.ADMIN, Role.RESPONSABLE)
  async addDisponibilite(
    @Param('id') id: string,
    @Body() createDisponibiliteDto: CreateDisponibiliteDto,
  ) {
    return await this.intervenantsService.addDisponibilite(id, createDisponibiliteDto);
  }

  @Get(':id/disponibilites')
  async getDisponibilites(@Param('id') id: string) {
    return await this.intervenantsService.getDisponibilites(id);
  }

  @Delete(':id/disponibilites/:disponibiliteId')
  @Roles(Role.ADMIN, Role.RESPONSABLE)
  async removeDisponibilite(
    @Param('id') id: string,
    @Param('disponibiliteId') disponibiliteId: string,
  ) {
    return await this.intervenantsService.removeDisponibilite(id, disponibiliteId);
  }

  @Post(':id/evaluations')
  @Roles(Role.ADMIN, Role.RESPONSABLE)
  async addEvaluation(
    @Param('id') id: string,
    @Body() createEvaluationDto: CreateEvaluationDto,
  ) {
    return await this.intervenantsService.addEvaluation(id, createEvaluationDto);
  }

  @Get(':id/evaluations')
  async getEvaluations(@Param('id') id: string) {
    return await this.intervenantsService.getEvaluations(id);
  }

  @Post(':id/modules')
  @Roles(Role.ADMIN, Role.RESPONSABLE)
  async addModule(
    @Param('id') id: string,
    @Body() createModuleDto: CreateModuleDto,
  ) {
    return await this.intervenantsService.addModule(id, createModuleDto);
  }

  @Get(':id/modules')
  async getModules(@Param('id') id: string) {
    return await this.intervenantsService.getModules(id);
  }

  @Delete(':id/modules/:moduleId')
  @Roles(Role.ADMIN, Role.RESPONSABLE)
  async removeModule(
    @Param('id') id: string,
    @Param('moduleId') moduleId: string,
  ) {
    return await this.intervenantsService.removeModule(id, moduleId);
  }
}