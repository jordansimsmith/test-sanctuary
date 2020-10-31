import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesService } from 'src/files/files.service';
import { Question } from 'src/questions/questions.entity';
import { Repository } from 'typeorm';
import { CreateTestDto } from './dto/create-test.dto';
import { Test } from './tests.entity';

@Injectable()
export class TestsService {
  constructor(
    @InjectRepository(Test) private readonly testsRepository: Repository<Test>,
    private readonly filesService: FilesService,
  ) {}

  async create(createTestDto: CreateTestDto): Promise<Test> {
    const fileKey = await this.filesService.uploadTest(
      await createTestDto.testFile,
      createTestDto.institutionId,
    );

    const test = new Test();
    test.name = createTestDto.name;
    test.subject = createTestDto.subject;
    test.code = createTestDto.code;
    test.year = createTestDto.year;
    test['institution' as any] = createTestDto.institutionId;
    test.testFileKey = fileKey;

    test.questions = Promise.resolve(
      createTestDto.questions.map(q => {
        const question = new Question();
        question.label = q.label;
        question.answer = q.answer;

        return question;
      }),
    );

    return this.testsRepository.save(test);
  }

  findAll(): Promise<Test[]> {
    return this.testsRepository.find();
  }

  findWhere(query: Partial<Test>): Promise<Test[]> {
    return this.testsRepository.find({ where: query });
  }

  async findOne(testId: number, institutionId: string): Promise<Test> {
    const test = await this.testsRepository.findOne(testId);
    if (!test) {
      return null;
    }

    // ensure the test belongs to the requested institution
    const institution = await test.institution;
    if (institution.id !== institutionId) {
      return null;
    }

    return test;
  }
}
