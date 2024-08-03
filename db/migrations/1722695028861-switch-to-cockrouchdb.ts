import { MigrationInterface, QueryRunner } from "typeorm";

export class SwitchToCockrouchdb1722695028861 implements MigrationInterface {
    name = 'SwitchToCockrouchdb1722695028861'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Categories" ("id" UUID DEFAULT gen_random_uuid() NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "createdAt" timestamptz NOT NULL DEFAULT now(), "updatedAt" timestamptz NOT NULL DEFAULT now(), "parentCategoryId" uuid, CONSTRAINT "PK_537b5c00afe7427c4fc9434cd59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_30f0c3e083681f76d7dfa8f487" ON "Categories" ("parentCategoryId") `);
        await queryRunner.query(`CREATE TABLE "Reviews" ("id" UUID DEFAULT gen_random_uuid() NOT NULL, "rating" decimal NOT NULL, "comment" varchar NOT NULL, "createdAt" timestamptz NOT NULL DEFAULT now(), "updatedAt" timestamptz NOT NULL DEFAULT now(), "userId" uuid, "productId" uuid, CONSTRAINT "PK_5ae106da7bc18dc3731e48a8a94" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_03697b4cf2383ce44b9b0ac3fd" ON "Reviews" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8679c285008ea7ff66b93edc0a" ON "Reviews" ("productId") `);
        await queryRunner.query(`CREATE TABLE "Products" ("id" UUID DEFAULT gen_random_uuid() NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "price" decimal(10,2) NOT NULL DEFAULT (0), "stock" int8 NOT NULL, "images" string NOT NULL, "createdAt" timestamptz NOT NULL DEFAULT now(), "updatedAt" timestamptz NOT NULL DEFAULT now(), "slug" varchar NOT NULL, "addedById" uuid, "categoryId" uuid, CONSTRAINT "UQ_26c9336d231c4e90419a5954bd7" UNIQUE ("name"), CONSTRAINT "UQ_e67e2afd334d79fdb9de48e68b7" UNIQUE ("slug"), CONSTRAINT "PK_36a07cc432789830e7fb7b58a83" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_38d2d5625490d24508e9c60534" ON "Products" ("addedById") `);
        await queryRunner.query(`CREATE INDEX "IDX_85fdee89fa67fcdce66863def2" ON "Products" ("categoryId") `);
        await queryRunner.query(`CREATE TABLE "Users" ("id" UUID DEFAULT gen_random_uuid() NOT NULL, "username" varchar(30) NOT NULL, "email" varchar NOT NULL, "googleId" varchar, "role" "public"."Users_role_enum" NOT NULL DEFAULT 'customer', "gender" "public"."Users_gender_enum" NOT NULL, "address" varchar NOT NULL, "password" varchar NOT NULL, "createdAt" timestamptz NOT NULL DEFAULT now(), "updatedAt" timestamptz NOT NULL DEFAULT now(), CONSTRAINT "UQ_ffc81a3b97dcbf8e320d5106c0d" UNIQUE ("username"), CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE ("email"), CONSTRAINT "UQ_1890a56ce1dc8028f854699ffab" UNIQUE ("googleId"), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Categories" ADD CONSTRAINT "FK_30f0c3e083681f76d7dfa8f4878" FOREIGN KEY ("parentCategoryId") REFERENCES "Categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Reviews" ADD CONSTRAINT "FK_03697b4cf2383ce44b9b0ac3fda" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Reviews" ADD CONSTRAINT "FK_8679c285008ea7ff66b93edc0ac" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Products" ADD CONSTRAINT "FK_38d2d5625490d24508e9c605340" FOREIGN KEY ("addedById") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Products" ADD CONSTRAINT "FK_85fdee89fa67fcdce66863def29" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Products" DROP CONSTRAINT "FK_85fdee89fa67fcdce66863def29"`);
        await queryRunner.query(`ALTER TABLE "Products" DROP CONSTRAINT "FK_38d2d5625490d24508e9c605340"`);
        await queryRunner.query(`ALTER TABLE "Reviews" DROP CONSTRAINT "FK_8679c285008ea7ff66b93edc0ac"`);
        await queryRunner.query(`ALTER TABLE "Reviews" DROP CONSTRAINT "FK_03697b4cf2383ce44b9b0ac3fda"`);
        await queryRunner.query(`ALTER TABLE "Categories" DROP CONSTRAINT "FK_30f0c3e083681f76d7dfa8f4878"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP INDEX "Products"@"IDX_85fdee89fa67fcdce66863def2" CASCADE`);
        await queryRunner.query(`DROP INDEX "Products"@"IDX_38d2d5625490d24508e9c60534" CASCADE`);
        await queryRunner.query(`DROP TABLE "Products"`);
        await queryRunner.query(`DROP INDEX "Reviews"@"IDX_8679c285008ea7ff66b93edc0a" CASCADE`);
        await queryRunner.query(`DROP INDEX "Reviews"@"IDX_03697b4cf2383ce44b9b0ac3fd" CASCADE`);
        await queryRunner.query(`DROP TABLE "Reviews"`);
        await queryRunner.query(`DROP INDEX "Categories"@"IDX_30f0c3e083681f76d7dfa8f487" CASCADE`);
        await queryRunner.query(`DROP TABLE "Categories"`);
    }

}
