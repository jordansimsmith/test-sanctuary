import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAttemptAndAnswers1604818663021 implements MigrationInterface {
    name = 'AddAttemptAndAnswers1604818663021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `attempt` (`id` int NOT NULL AUTO_INCREMENT, `userId` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `testId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `answer` (`id` int NOT NULL AUTO_INCREMENT, `label` varchar(255) NOT NULL, `answer` varchar(255) NOT NULL, `attemptId` int NULL, UNIQUE INDEX `IDX_ANSWER_ATTEMPT_LABEL` (`id`, `label`, `attemptId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `attempt` ADD CONSTRAINT `FK_1b56c39955b4b0295152179d2fc` FOREIGN KEY (`testId`) REFERENCES `test`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `answer` ADD CONSTRAINT `FK_df3b92aa295640d070922ebc382` FOREIGN KEY (`attemptId`) REFERENCES `attempt`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `answer` DROP FOREIGN KEY `FK_df3b92aa295640d070922ebc382`");
        await queryRunner.query("ALTER TABLE `attempt` DROP FOREIGN KEY `FK_1b56c39955b4b0295152179d2fc`");
        await queryRunner.query("DROP INDEX `IDX_ANSWER_ATTEMPT_LABEL` ON `answer`");
        await queryRunner.query("DROP TABLE `answer`");
        await queryRunner.query("DROP TABLE `attempt`");
    }

}
