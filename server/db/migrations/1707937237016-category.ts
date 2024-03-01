import { MigrationInterface, QueryRunner } from "typeorm";

export class Category1707937237016 implements MigrationInterface {
    name = 'Category1707937237016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Categories" ("id" uuid NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "parentCategoryId" uuid, CONSTRAINT "PK_537b5c00afe7427c4fc9434cd59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Categories" ADD CONSTRAINT "FK_30f0c3e083681f76d7dfa8f4878" FOREIGN KEY ("parentCategoryId") REFERENCES "Categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Categories" DROP CONSTRAINT "FK_30f0c3e083681f76d7dfa8f4878"`);
        await queryRunner.query(`DROP TABLE "Categories"`);
    }

}
