import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1707587249567 implements MigrationInterface {
    name = 'Initial1707587249567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "upadatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "upadatedAt"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "createdAt"`);
    }

}
