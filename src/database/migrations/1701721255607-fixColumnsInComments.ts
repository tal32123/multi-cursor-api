import { MigrationInterface, QueryRunner } from "typeorm";

export class FixColumnsInComments1701721255607 implements MigrationInterface {
    name = 'FixColumnsInComments1701721255607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "x"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "x" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "y"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "y" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "y"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "y" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "x"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "x" integer NOT NULL`);
    }

}
