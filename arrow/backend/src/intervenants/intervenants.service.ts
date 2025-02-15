// src/intervenants/intervenants.service.ts

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Intervenant } from './schemas/intervenant.schema';
import { CreateIntervenantDto } from './dto/create-intervenant.dto';
import { FileService } from '../common/services/file.service';
import { FilterIntervenantDto } from './dto/filter-intervenant.dto';
import { CreateDisponibiliteDto } from './dto/create-disponibilite.dto';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { CreateModuleDto } from './dto/create-module.dto';

@Injectable()
export class IntervenantsService {
  constructor(
    @InjectModel(Intervenant.name) private intervenantModel: Model<Intervenant>,
    private readonly fileService: FileService,
  ) {}

  // Méthodes existantes
  async create(createIntervenantDto: CreateIntervenantDto): Promise<Intervenant> {
    const createdIntervenant = new this.intervenantModel(createIntervenantDto);
    return createdIntervenant.save();
  }

  async findAll(filterDto?: FilterIntervenantDto): Promise<Intervenant[]> {
    const query = this.intervenantModel.find();

    if (filterDto?.search) {
      query.or([
        { nom: { $regex: filterDto.search, $options: 'i' } },
        { prenom: { $regex: filterDto.search, $options: 'i' } },
        { emailPro: { $regex: filterDto.search, $options: 'i' } }
      ]);
    }

    if (filterDto?.specialite) {
      query.where('specialite').equals(filterDto.specialite);
    }

    if (filterDto?.actif !== undefined) {
      query.where('actif').equals(filterDto.actif);
    }

    return query.exec();
  }

  async findOne(id: string): Promise<Intervenant> {
    const intervenant = await this.intervenantModel.findById(id).exec();
    if (!intervenant) {
      throw new NotFoundException(`Intervenant ${id} non trouvé`);
    }
    return intervenant;
  }

  async update(id: string, updateIntervenantDto: Partial<CreateIntervenantDto>) {
    return this.intervenantModel.findByIdAndUpdate(id, updateIntervenantDto, { new: true });
  }

  async remove(id: string): Promise<void> {
    const result = await this.intervenantModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Intervenant ${id} non trouvé`);
    }
  }

  // Nouvelles méthodes pour la gestion des fichiers
  async updatePhoto(id: string, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    
    const intervenant = await this.intervenantModel.findById(id);
    if (!intervenant) {
      throw new NotFoundException('Intervenant not found');
    }

    const photoUrl = `uploads/photos/${file.filename}`;
    
    return this.intervenantModel.findByIdAndUpdate(
      id,
      { photoUrl },
      { new: true }
    );
  }

  async updateDocuments(id: string, files: any) {
    const updates: any = {};
    
    if (files.cv) {
      updates.cvUrl = this.fileService.getFilePath('documents', files.cv[0].filename);
    }
    if (files.pieceIdentite) {
      updates.pieceIdentiteUrl = this.fileService.getFilePath('documents', files.pieceIdentite[0].filename);
    }
    if (files.rib) {
      updates.ribUrl = this.fileService.getFilePath('documents', files.rib[0].filename);
    }
    if (files.kbis) {
      updates.kbisUrl = this.fileService.getFilePath('documents', files.kbis[0].filename);
    }
    if (files.assurance) {
      updates.assuranceRCPUrl = this.fileService.getFilePath('documents', files.assurance[0].filename);
    }

    const intervenant = await this.intervenantModel.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );

    if (!intervenant) {
      throw new NotFoundException(`Intervenant ${id} non trouvé`);
    }
    return intervenant;
  }

  // Méthodes pour la gestion des disponibilités
  async addDisponibilite(id: string, createDisponibiliteDto: CreateDisponibiliteDto) {
    const intervenant = await this.intervenantModel.findById(id);
    if (!intervenant) {
      throw new NotFoundException(`Intervenant ${id} non trouvé`);
    }

    // Initialiser le tableau s'il n'existe pas
    if (!intervenant.disponibilites) {
      intervenant.disponibilites = [];
    }

    // Créer une nouvelle disponibilité en utilisant le modèle Mongoose
    const newDisponibilite = {
      dateDebut: createDisponibiliteDto.dateDebut,
      dateFin: createDisponibiliteDto.dateFin,
      creneau: createDisponibiliteDto.creneau,
      disponible: createDisponibiliteDto.disponible ?? true,
      commentaire: createDisponibiliteDto.commentaire
    } as any;  // Utiliser 'as any' pour contourner le typage strict

    intervenant.disponibilites.push(newDisponibilite);
    return await intervenant.save();
  }

  async getDisponibilites(id: string) {
    const intervenant = await this.intervenantModel.findById(id);
    if (!intervenant) {
      throw new NotFoundException(`Intervenant ${id} non trouvé`);
    }
    return intervenant.disponibilites || [];
  }

  async removeDisponibilite(id: string, disponibiliteId: string) {
    const intervenant = await this.intervenantModel.findById(id);
    if (!intervenant) {
      throw new NotFoundException(`Intervenant ${id} non trouvé`);
    }

    // Utiliser Types de Mongoose pour la comparaison
    const updatedDisponibilites = intervenant.disponibilites.filter(
      (d: any) => d._id.toString() !== disponibiliteId
    );

    intervenant.disponibilites = updatedDisponibilites;
    return await intervenant.save();
  }

  // Méthodes pour la gestion des évaluations
  async addEvaluation(id: string, createEvaluationDto: CreateEvaluationDto) {
    const intervenant = await this.intervenantModel.findById(id);
    if (!intervenant) {
      throw new NotFoundException(`Intervenant ${id} non trouvé`);
    }

    if (!intervenant.evaluations) {
      intervenant.evaluations = [];
    }

    intervenant.evaluations.push(createEvaluationDto as any);
    return await intervenant.save();
  }

  async getEvaluations(id: string) {
    const intervenant = await this.intervenantModel.findById(id);
    if (!intervenant) {
      throw new NotFoundException(`Intervenant ${id} non trouvé`);
    }
    return intervenant.evaluations || [];
  }

  // Méthodes pour la gestion des modules
  async addModule(id: string, createModuleDto: CreateModuleDto) {
    const intervenant = await this.intervenantModel.findById(id);
    if (!intervenant) {
      throw new NotFoundException(`Intervenant ${id} non trouvé`);
    }

    if (!intervenant.modules) {
      intervenant.modules = [];
    }

    intervenant.modules.push(createModuleDto as any);
    return await intervenant.save();
  }

  async getModules(id: string) {
    const intervenant = await this.intervenantModel.findById(id);
    if (!intervenant) {
      throw new NotFoundException(`Intervenant ${id} non trouvé`);
    }
    return intervenant.modules || [];
  }

  async removeModule(id: string, moduleId: string) {
    const intervenant = await this.intervenantModel.findById(id);
    if (!intervenant) {
      throw new NotFoundException(`Intervenant ${id} non trouvé`);
    }

    intervenant.modules = intervenant.modules.filter(
      (m: any) => m._id.toString() !== moduleId
    );

    return await intervenant.save();
  }
}