import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAttemptDate1604821562789 implements MigrationInterface {
    name = 'AddAttemptDate1604821562789'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `attempt` ADD `datetime` datetime NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `attempt` DROP COLUMN `datetime`");
    }

}
