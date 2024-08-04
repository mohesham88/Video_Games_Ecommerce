import { MigrationInterface, QueryRunner } from "typeorm";

export class HashPasswordBeforeUpdateToo1722778048300 implements MigrationInterface {
    name = 'HashPasswordBeforeUpdateToo1722778048300'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "Users"@"UQ_ffc81a3b97dcbf8e320d5106c0d" CASCADE`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "username" varchar(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "UQ_ffc81a3b97dcbf8e320d5106c0d" UNIQUE ("username")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "Users"@"UQ_ffc81a3b97dcbf8e320d5106c0d" CASCADE`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "username" varchar(30) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "UQ_ffc81a3b97dcbf8e320d5106c0d" UNIQUE ("username")`);
    }

}
