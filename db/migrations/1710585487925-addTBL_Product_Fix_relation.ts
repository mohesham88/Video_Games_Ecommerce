import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTBLProductFixRelation1710585487925 implements MigrationInterface {
    name = 'AddTBLProductFixRelation1710585487925'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Categories" DROP CONSTRAINT "FK_ab7829f832bb87ca0b847f55beb"`);
        await queryRunner.query(`ALTER TABLE "Categories" DROP COLUMN "productsId"`);
        await queryRunner.query(`ALTER TABLE "Products" ADD "categoriesId" uuid`);
        await queryRunner.query(`ALTER TABLE "Products" ADD CONSTRAINT "FK_00811a7afeb140440df707f4192" FOREIGN KEY ("categoriesId") REFERENCES "Categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Products" DROP CONSTRAINT "FK_00811a7afeb140440df707f4192"`);
        await queryRunner.query(`ALTER TABLE "Products" DROP COLUMN "categoriesId"`);
        await queryRunner.query(`ALTER TABLE "Categories" ADD "productsId" uuid`);
        await queryRunner.query(`ALTER TABLE "Categories" ADD CONSTRAINT "FK_ab7829f832bb87ca0b847f55beb" FOREIGN KEY ("productsId") REFERENCES "Products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
