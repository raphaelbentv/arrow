import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Etudiant } from './schemas/etudiant.schema';
import { CreateEtudiantDto } from './dto/create-etudiant.dto';
import { UpdateEtudiantDto } from './dto/update-etudiant.dto';
import { FileService } from '../common/services/file.service';
import { Evaluation } from './interfaces/evaluation.interface';
import { Absence } from './interfaces/absence.interface';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { CreateAbsenceDto } from './dto/create-absence.dto';
import { DocumentsEtudiant } from './interfaces/documents.interface';

@Injectable()
export class EtudiantsService {
  constructor(
    @InjectModel(Etudiant.name) private readonly etudiantModel: Model<Etudiant>,
    private readonly fileService: FileService,
  ) {}

  async create(createEtudiantDto: CreateEtudiantDto): Promise<Etudiant> {
    const createdEtudiant = new this.etudiantModel(createEtudiantDto);
    return createdEtudiant.save();
  }

  async findAll(filterQuery: any): Promise<Etudiant[]> {
    return this.etudiantModel.find(filterQuery).exec();
  }

  async findOne(id: string): Promise<Etudiant> {
    const etudiant = await this.etudiantModel.findById(id).exec();
    if (!etudiant) {
      throw new NotFoundException(`Étudiant avec l'ID ${id} non trouvé`);
    }
    return etudiant;
  }

  async update(id: string, updateEtudiantDto: UpdateEtudiantDto): Promise<Etudiant> {
    const etudiant = await this.etudiantModel
      .findByIdAndUpdate(id, updateEtudiantDto, { new: true })
      .exec();
    if (!etudiant) {
      throw new NotFoundException(`Étudiant avec l'ID ${id} non trouvé`);
    }
    return etudiant; // ou 'return etudiant!' si la signature le permet
  }

  async remove(id: string): Promise<void> {
    const result = await this.etudiantModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Étudiant avec l'ID ${id} non trouvé`);
    }
  }

  async uploadPhoto(id: string, file: Express.Multer.File): Promise<Etudiant> {
    const etudiant = await this.findOne(id);
    const photoPath = await this.fileService.saveFile(file, 'photos/etudiants');
    
    if (etudiant.photo) {
      await this.fileService.deleteFile(etudiant.photo);
    }

    return this.update(id, { photo: photoPath } as UpdateEtudiantDto);
  }

  async uploadDocument(id: string, type: string, file: Express.Multer.File): Promise<Etudiant> {
    const etudiant = await this.findOne(id);
    const documentPath = await this.fileService.saveFile(file, 'documents/etudiants');
    
    const updateData = {
      [`documentsAdministratifs.${type}`]: documentPath
    };

    const updatedEtudiant = await this.etudiantModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    
    if (!updatedEtudiant) {
      throw new NotFoundException(`Étudiant avec l'ID ${id} non trouvé`);
    }
    
    return updatedEtudiant;
  }

  async addEvaluation(id: string, evaluation: CreateEvaluationDto): Promise<Etudiant> {
    const etudiant = await this.findOne(id);
    const newEvaluation: Evaluation = {
      ...evaluation,
      date: new Date(evaluation.date),
      module: new Types.ObjectId(evaluation.module)
    };

    const updatedEtudiant = await this.etudiantModel
      .findByIdAndUpdate(
        id,
        { $push: { evaluations: newEvaluation } },
        { new: true }
      )
      .exec();
    
    if (!updatedEtudiant) {
      throw new NotFoundException(`Étudiant avec l'ID ${id} non trouvé`);
    }
    
    return updatedEtudiant;
  }

  async addAbsence(id: string, absence: CreateAbsenceDto): Promise<Etudiant> {
    const etudiant = await this.findOne(id);
    const newAbsence: Absence = {
      ...absence,
      date: new Date(absence.date),
      dateJustification: absence.dateJustification ? new Date(absence.dateJustification) : undefined
    };

    const updatedEtudiant = await this.etudiantModel
      .findByIdAndUpdate(
        id,
        { $push: { absences: newAbsence } },
        { new: true }
      )
      .exec();
    
    if (!updatedEtudiant) {
      throw new NotFoundException(`Étudiant avec l'ID ${id} non trouvé`);
    }
    
    return updatedEtudiant;
  }

  async getEvaluations(id: string): Promise<Evaluation[]> {
    const etudiant = await this.findOne(id);
    return etudiant.evaluations || [];
  }

  async getAbsences(id: string, query?: {
    startDate?: Date;
    endDate?: Date;
    justifie?: boolean;
    type?: string;
  }): Promise<Absence[]> {
    const etudiant = await this.findOne(id);
    let absences = etudiant.absences || [];

    if (query) {
      if (query.startDate) {
        absences = absences.filter(a => 
          new Date(a.date) >= new Date(query.startDate!)
        );
      }
      if (query.endDate) {
        absences = absences.filter(a => 
          new Date(a.date) <= new Date(query.endDate!)
        );
      }
      if (query.justifie !== undefined) {
        absences = absences.filter(a => a.justifie === query.justifie);
      }
      if (query.type) {
        absences = absences.filter(a => a.type === query.type);
      }
    }

    return absences;
  }

  async getTotalAbsences(id: string): Promise<{ total: number; nonJustifiees: number }> {
    const absences = await this.getAbsences(id);
    const total = absences.reduce((sum, abs) => sum + abs.duree, 0);
    const nonJustifiees = absences
      .filter(abs => !abs.justifie)
      .reduce((sum, abs) => sum + abs.duree, 0);

    return { total, nonJustifiees };
  }

  async getDocuments(id: string): Promise<any> {
    const etudiant = await this.findOne(id);
    // Retourne l'objet documentsAdministratifs ou un objet vide
    return etudiant.documentsAdministratifs || {};
  }

  async deleteDocument(id: string, type: keyof DocumentsEtudiant): Promise<Etudiant> {
    const etudiant = await this.findOne(id);
    const currentDocuments = etudiant.documentsAdministratifs || {};
    const docToDelete = currentDocuments[type];
    
    // Si docToDelete est un tableau, gérer le cas différemment
    if (Array.isArray(docToDelete)) {
      // ...gérer la suppression d'éléments du tableau...
    } else if (typeof docToDelete === 'string') {
      await this.fileService.deleteFile(docToDelete);
    }

    const updateData = { $unset: { [`documentsAdministratifs.${type}`]: "" } };
    const updatedEtudiant = await this.etudiantModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    
    if (!updatedEtudiant) {
      throw new NotFoundException(`Étudiant avec l'ID ${id} non trouvé`);
    }
    
    return updatedEtudiant;
  }

  async findById(id: string): Promise<Etudiant> {
    const etudiant = await this.etudiantModel.findById(id);
    if (!etudiant) {
      throw new NotFoundException(`Étudiant #${id} non trouvé`);
    }
    return etudiant;
  }

  async saveDocument(id: string, type: keyof DocumentsEtudiant, path: string): Promise<Etudiant> {
    const etudiant = await this.findById(id);
    if (!etudiant) {
      throw new NotFoundException(`Étudiant #${id} non trouvé`);
    }

    const updateQuery = Array.isArray(etudiant.documents[type])
      ? { $push: { [`documents.${type}`]: path } }
      : { $set: { [`documents.${type}`]: path } };

    return this.etudiantModel.findByIdAndUpdate(
      id,
      updateQuery,
      { new: true }
    ) as Promise<Etudiant>;
  }
}