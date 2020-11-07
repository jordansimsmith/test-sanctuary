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
    const idRegex = /^[a-zA-Z0-9]+[a-zA-Z0-9-_]+[a-zA-Z0-9]+$/;
    if (!idRegex.test(createInstitutionDto.id)) {
      throw new Error(
        `Institution ID ${createInstitutionDto.id} is invalid. Please try again with an ID of minimum length 3 that contains only alphanumeric characters with dashes or underscores separating them.`,
      );
    }

    if (await this.institutionsRepository.findOne(createInstitutionDto.id)) {
      throw new Error(
        `Institution ID ${createInstitutionDto.id} is already taken. Please try with another ID.`,
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
