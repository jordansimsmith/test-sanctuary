import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTestDto } from './dto/create-test.dto';
import { Test } from './tests.entity';

@Injectable()
export class TestsService {
  constructor(
    @InjectRepository(Test) private readonly testsRepository: Repository<Test>,
  ) {}

  create(createTestDto: CreateTestDto): Promise<Test> {
    const test = new Test();
    test.name = createTestDto.name;
    test.subject = createTestDto.subject;
    test.code = createTestDto.code;
    test.year = createTestDto.year;
    test['institution' as any] = createTestDto.institutionId;

    return this.testsRepository.save(test);
  }

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