import {MigrationInterface, QueryRunner} from "typeorm";

export class RenameInstitutionOwnerColumn1605053841415 implements MigrationInterface {
    name = 'RenameInstitutionOwnerColumn1605053841415'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `institution` CHANGE `ownerId` `creatorId` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `institution` CHANGE `creatorId` `ownerId` varchar(255) NOT NULL");
    }

}
