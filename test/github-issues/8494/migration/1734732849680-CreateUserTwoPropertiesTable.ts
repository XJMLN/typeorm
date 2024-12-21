import { MigrationInterface, QueryRunner } from "../../../../src"

export class CreateUserTwoPropertiesTable1734732849680
    implements MigrationInterface
{
    name = "CreateUserTwoPropertiesTable1734732849680"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_two_properties"
                                 (
                                     "id"    SERIAL            NOT NULL,
                                     "email" character varying NOT NULL,
                                     CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
                                 )`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_two_properties"`)
    }
}
