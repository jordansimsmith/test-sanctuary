import {MigrationInterface, QueryRunner} from "typeorm";

export class RenameQuestionAnswerColumn1604825842722 implements MigrationInterface {
    name = 'RenameQuestionAnswerColumn1604825842722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `question` CHANGE `answer` `officialAnswer` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `question` CHANGE `officialAnswer` `answer` varchar(255) NOT NULL");
    }

}
