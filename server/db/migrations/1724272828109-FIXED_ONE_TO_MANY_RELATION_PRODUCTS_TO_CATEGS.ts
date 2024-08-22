import { MigrationInterface, QueryRunner } from "typeorm";

export class FIXEDONETOMANYRELATIONPRODUCTSTOCATEGS1724272828109 implements MigrationInterface {
    name = 'FIXEDONETOMANYRELATIONPRODUCTSTOCATEGS1724272828109'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Products" DROP CONSTRAINT "FK_85fdee89fa67fcdce66863def29"`);
        await queryRunner.query(`DROP INDEX "Products"@"IDX_85fdee89fa67fcdce66863def2" CASCADE`);
        await queryRunner.query(`ALTER TABLE "Products" DROP COLUMN "categoryId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Products" ADD "categoryId" uuid`);
        await queryRunner.query(`CREATE INDEX "IDX_85fdee89fa67fcdce66863def2" ON "Products" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "Products" ADD CONSTRAINT "FK_85fdee89fa67fcdce66863def29" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
