import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTBLProductFixRelation21710585625651 implements MigrationInterface {
    name = 'AddTBLProductFixRelation21710585625651'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Products" DROP CONSTRAINT "FK_00811a7afeb140440df707f4192"`);
        await queryRunner.query(`ALTER TABLE "Products" RENAME COLUMN "categoriesId" TO "categoryId"`);
        await queryRunner.query(`ALTER TABLE "Products" ADD CONSTRAINT "FK_85fdee89fa67fcdce66863def29" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Products" DROP CONSTRAINT "FK_85fdee89fa67fcdce66863def29"`);
        await queryRunner.query(`ALTER TABLE "Products" RENAME COLUMN "categoryId" TO "categoriesId"`);
        await queryRunner.query(`ALTER TABLE "Products" ADD CONSTRAINT "FK_00811a7afeb140440df707f4192" FOREIGN KEY ("categoriesId") REFERENCES "Categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
