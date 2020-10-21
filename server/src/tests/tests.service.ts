import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from './tests.entity';

@Injectable()
export class TestsService {
  constructor(
    @InjectRepository(Test) private readonly testsRepository: Repository<Test>,
  ) {}

  findAll(): Promise<Test[]> {
    return this.testsRepository.find();
  }

  findWhere(query: Partial<Test>): Promise<Test[]> {
    return this.testsRepository.find({ where: query });
  }

  findOne(id: number): Promise<Test> {
    return this.testsRepository.findOne(id);
  }
}
