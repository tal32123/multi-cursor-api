import { MigrationInterface, QueryRunner } from "typeorm";

export class FixColumnsInComments1701721358542 implements MigrationInterface {
    name = 'FixColumnsInComments1701721358542'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "x"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "x" double precision`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "y"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "y" double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "y"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "y" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "x"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "x" integer NOT NULL`);
    }

}
