import { MigrationInterface, QueryRunner } from "typeorm";

export class FIXEDONETOMANYRELATIONPRODUCTSTOCATEGS1724271211208 implements MigrationInterface {
    name = 'FIXEDONETOMANYRELATIONPRODUCTSTOCATEGS1724271211208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Categories" ADD "productsId" uuid`);
        await queryRunner.query(`CREATE INDEX "IDX_ab7829f832bb87ca0b847f55be" ON "Categories" ("productsId") `);
        await queryRunner.query(`ALTER TABLE "Categories" ADD CONSTRAINT "FK_ab7829f832bb87ca0b847f55beb" FOREIGN KEY ("productsId") REFERENCES "Products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Categories" DROP CONSTRAINT "FK_ab7829f832bb87ca0b847f55beb"`);
        await queryRunner.query(`DROP INDEX "Categories"@"IDX_ab7829f832bb87ca0b847f55be" CASCADE`);
        await queryRunner.query(`ALTER TABLE "Categories" DROP COLUMN "productsId"`);
    }

}
