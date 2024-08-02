import { MigrationInterface, QueryRunner } from "typeorm";

export class ReviewTable1712432938621 implements MigrationInterface {
    name = 'ReviewTable1712432938621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Reviews" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rating" numeric NOT NULL, "comment" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "productId" uuid, CONSTRAINT "PK_5ae106da7bc18dc3731e48a8a94" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Reviews" ADD CONSTRAINT "FK_03697b4cf2383ce44b9b0ac3fda" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Reviews" ADD CONSTRAINT "FK_8679c285008ea7ff66b93edc0ac" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Reviews" DROP CONSTRAINT "FK_8679c285008ea7ff66b93edc0ac"`);
        await queryRunner.query(`ALTER TABLE "Reviews" DROP CONSTRAINT "FK_03697b4cf2383ce44b9b0ac3fda"`);
        await queryRunner.query(`DROP TABLE "Reviews"`);
    }

}
