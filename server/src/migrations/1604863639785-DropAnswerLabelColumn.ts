import {MigrationInterface, QueryRunner} from "typeorm";

export class DropAnswerLabelColumn1604863639785 implements MigrationInterface {
    name = 'DropAnswerLabelColumn1604863639785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_ANSWER_ATTEMPT_LABEL` ON `answer`");
        await queryRunner.query("ALTER TABLE `answer` DROP COLUMN `label`");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_ANSWER_ATTEMPT` ON `answer` (`id`, `attemptId`)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_ANSWER_ATTEMPT` ON `answer`");
        await queryRunner.query("ALTER TABLE `answer` ADD `label` varchar(255) NOT NULL");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_ANSWER_ATTEMPT_LABEL` ON `answer` (`id`, `label`, `attemptId`)");
    }

}
