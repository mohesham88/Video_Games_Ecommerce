import { MigrationInterface, QueryRunner } from "typeorm";

export class MakingSlugsForProductsUnique1711062024325 implements MigrationInterface {
    name = 'MakingSlugsForProductsUnique1711062024325'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Products" ADD CONSTRAINT "UQ_26c9336d231c4e90419a5954bd7" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "Products" ADD CONSTRAINT "UQ_e67e2afd334d79fdb9de48e68b7" UNIQUE ("slug")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Products" DROP CONSTRAINT "UQ_e67e2afd334d79fdb9de48e68b7"`);
        await queryRunner.query(`ALTER TABLE "Products" DROP CONSTRAINT "UQ_26c9336d231c4e90419a5954bd7"`);
    }

}
