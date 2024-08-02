import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1707586302465 implements MigrationInterface {
    name = 'Initial1707586302465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "UQ_ffc81a3b97dcbf8e320d5106c0d" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "UQ_ffc81a3b97dcbf8e320d5106c0d"`);
    }

}
