import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Institution } from 'src/institutions/institutions.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Test {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  subject: string;

  @Column('int')
  @Field(() => Int)
  code: number;

  @Column('int')
  @Field(() => Int)
  year: number;

  @ManyToOne(
    () => Institution,
    institution => institution.tests,
  )
  @Field(() => Institution)
  institution: Promise<Institution>;
}