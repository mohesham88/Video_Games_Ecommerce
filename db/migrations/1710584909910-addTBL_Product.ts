import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTBLProduct1710584909910 implements MigrationInterface {
    name = 'AddTBLProduct1710584909910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric(10,2) NOT NULL DEFAULT '0', "stock" integer NOT NULL, "images" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "slug" character varying NOT NULL, "addedById" uuid, CONSTRAINT "PK_36a07cc432789830e7fb7b58a83" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Categories" ADD "productsId" uuid`);
        await queryRunner.query(`ALTER TABLE "Categories" ADD CONSTRAINT "FK_ab7829f832bb87ca0b847f55beb" FOREIGN KEY ("productsId") REFERENCES "Products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Products" ADD CONSTRAINT "FK_38d2d5625490d24508e9c605340" FOREIGN KEY ("addedById") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Products" DROP CONSTRAINT "FK_38d2d5625490d24508e9c605340"`);
        await queryRunner.query(`ALTER TABLE "Categories" DROP CONSTRAINT "FK_ab7829f832bb87ca0b847f55beb"`);
        await queryRunner.query(`ALTER TABLE "Categories" DROP COLUMN "productsId"`);
        await queryRunner.query(`DROP TABLE "Products"`);
    }

}
