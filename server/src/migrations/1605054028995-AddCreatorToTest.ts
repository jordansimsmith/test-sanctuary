import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCreatorToTest1605054028995 implements MigrationInterface {
    name = 'AddCreatorToTest1605054028995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `test` ADD `creatorId` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `test` DROP COLUMN `creatorId`");
    }

}
