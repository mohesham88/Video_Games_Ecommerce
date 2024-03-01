import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1707059586721 implements MigrationInterface {
    name = 'Initial1707059586721'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Users_role_enum" AS ENUM('admin', 'customer', 'vendor')`);
        await queryRunner.query(`CREATE TYPE "public"."Users_gender_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`CREATE TABLE "Users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(30) NOT NULL, "email" character varying NOT NULL, "role" "public"."Users_role_enum" NOT NULL DEFAULT 'customer', "gender" "public"."Users_gender_enum" NOT NULL, "address" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TYPE "public"."Users_gender_enum"`);
        await queryRunner.query(`DROP TYPE "public"."Users_role_enum"`);
    }

}
