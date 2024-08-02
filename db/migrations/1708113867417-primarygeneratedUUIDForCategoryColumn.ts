import { MigrationInterface, QueryRunner } from "typeorm";

export class PrimarygeneratedUUIDForCategoryColumn1708113867417 implements MigrationInterface {
    name = 'PrimarygeneratedUUIDForCategoryColumn1708113867417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Categories" DROP CONSTRAINT "FK_30f0c3e083681f76d7dfa8f4878"`);
        await queryRunner.query(`ALTER TABLE "Categories" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "Categories" ADD CONSTRAINT "FK_30f0c3e083681f76d7dfa8f4878" FOREIGN KEY ("parentCategoryId") REFERENCES "Categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Categories" DROP CONSTRAINT "FK_30f0c3e083681f76d7dfa8f4878"`);
        await queryRunner.query(`ALTER TABLE "Categories" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Categories" ADD CONSTRAINT "FK_30f0c3e083681f76d7dfa8f4878" FOREIGN KEY ("parentCategoryId") REFERENCES "Categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
