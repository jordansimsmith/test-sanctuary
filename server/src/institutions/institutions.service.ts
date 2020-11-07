import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { Repository } from 'typeorm';
import { Institution } from './institutions.entity';

@Injectable()
export class InstitutionsService {
  constructor(
    @InjectRepository(Institution)
    private readonly institutionsRepository: Repository<Institution>,
  ) {}

  async create(
    createInstitutionDto: CreateInstitutionDto,
  ): Promise<Institution> {
    if (await this.institutionsRepository.findOne(createInstitutionDto.id)) {
      throw new Error(
        `Institution ID ${createInstitutionDto.id} is already taken, please try with another ID`,
      );
    }

    const institution = new Institution();
    institution.id = createInstitutionDto.id;
    institution.displayName = createInstitutionDto.displayName;

    return this.institutionsRepository.save(institution);
  }

  findAll(): Promise<Institution[]> {
    return this.institutionsRepository.find();
  }

  findOne(id: string): Promise<Institution> {
    return this.institutionsRepository.findOne(id);
  }
}
