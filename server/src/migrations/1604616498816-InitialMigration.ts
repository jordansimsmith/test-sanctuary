import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1604616498816 implements MigrationInterface {
    name = 'InitialMigration1604616498816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `question` (`id` int NOT NULL AUTO_INCREMENT, `label` varchar(255) NOT NULL, `answer` varchar(255) NOT NULL, `testId` int NULL, UNIQUE INDEX `IDX_QUESTION_LABEL` (`id`, `label`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `test` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `subject` varchar(255) NOT NULL, `code` int NOT NULL, `year` int NOT NULL, `testFileKey` varchar(255) NOT NULL, `institutionId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `institution` (`id` varchar(255) NOT NULL, `displayName` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `question` ADD CONSTRAINT `FK_2c8f911efa2fb5b0fe1abe92020` FOREIGN KEY (`testId`) REFERENCES `test`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `test` ADD CONSTRAINT `FK_5256d00af14c54304b3326419d8` FOREIGN KEY (`institutionId`) REFERENCES `institution`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `test` DROP FOREIGN KEY `FK_5256d00af14c54304b3326419d8`");
        await queryRunner.query("ALTER TABLE `question` DROP FOREIGN KEY `FK_2c8f911efa2fb5b0fe1abe92020`");
        await queryRunner.query("DROP TABLE `institution`");
        await queryRunner.query("DROP TABLE `test`");
        await queryRunner.query("DROP INDEX `IDX_QUESTION_LABEL` ON `question`");
        await queryRunner.query("DROP TABLE `question`");
    }

}
