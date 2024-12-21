import { MigrationInterface, QueryRunner } from "../../../../src"

export class CreateUserTableNoEmailColumn1734732849680
    implements MigrationInterface
{
    name = "CreateUserTableNoEmailColumn1734732849680"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user"
                                 (
                                     "id" SERIAL NOT NULL,
                                     CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
                                 )`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`)
    }
}
