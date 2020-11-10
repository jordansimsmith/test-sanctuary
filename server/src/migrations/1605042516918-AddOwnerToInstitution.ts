import {MigrationInterface, QueryRunner} from "typeorm";

export class AddOwnerToInstitution1605042516918 implements MigrationInterface {
    name = 'AddOwnerToInstitution1605042516918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `institution` ADD `ownerId` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `institution` DROP COLUMN `ownerId`");
    }

}
