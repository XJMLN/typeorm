import "reflect-metadata"
import { DataSource } from "../../../src"
import {
    closeTestingConnections,
    createTestingConnections,
    TestingOptions,
} from "../../utils/test-utils"
import { User } from "./entity/User"
import { expect } from "chai"
import { CreateUserTableNoEmailColumn1734732849680 } from "./migration/1734732849680-CreateUserTableNoEmailColumn"
import { CreateUserTable1734732849680 } from "./migration/1734732849680-CreateUserTable"
import { CreateUserTwoPropertiesTable1734732849680 } from "./migration/1734732849680-CreateUserTwoPropertiesTable"
import { UserTwoProperties } from "./entity/UserTwoProperties"

describe("github issues > #8494 Naming column unique constraint with decorator not working as expected", () => {
    const connectionOptions: TestingOptions = {
        schemaCreate: false,
        dropSchema: true,
        logging: true,
        entities: [User],
        enabledDrivers: ["postgres"],
    }

    describe("github issues > #8494 Unique constraint on already created columns", () => {
        let connections: DataSource[]
        before(
            async () =>
                (connections = await createTestingConnections({
                    ...connectionOptions,
                    migrations: [CreateUserTable1734732849680],
                })),
        )
        after(() => closeTestingConnections(connections))

        it("should keep user specified unique key name, when adding unique decorator to already existing column", () =>
            Promise.all(
                connections.map(async (connection) => {
                    await connection.runMigrations()
                    const queryRunner = connection.createQueryRunner()

                    await connection.synchronize()

                    const table = await queryRunner.getTable("user")

                    await queryRunner.release()

                    const emailUnique = table!.uniques[0].name

                    expect(emailUnique).to.be.not.undefined
                    expect(emailUnique).to.equal("email-unique")
                }),
            ))
    })

    describe("github issues > #8494 Unique constraint on new column", () => {
        let connections: DataSource[]
        before(
            async () =>
                (connections = await createTestingConnections({
                    ...connectionOptions,
                    migrations: [CreateUserTableNoEmailColumn1734732849680],
                })),
        )
        after(() => closeTestingConnections(connections))

        it("should keep user specified unique key name, when creating new column with unique decorator", () =>
            Promise.all(
                connections.map(async (connection) => {
                    await connection.runMigrations()
                    const queryRunner = connection.createQueryRunner()

                    await connection.synchronize()

                    const table = await queryRunner.getTable("user")

                    await queryRunner.release()

                    const emailUnique = table!.uniques[0].name

                    expect(emailUnique).to.be.not.undefined
                    expect(emailUnique).to.equal("email-unique")
                }),
            ))
    })

    describe("github issues > #8494 apply 2 unique constraint on already created column", () => {
        let connections: DataSource[]
        before(
            async () =>
                (connections = await createTestingConnections({
                    ...connectionOptions,
                    migrations: [CreateUserTwoPropertiesTable1734732849680],
                    entities: [UserTwoProperties],
                })),
        )
        after(() => closeTestingConnections(connections))

        it("should keep user specified unique key names, when adding unique decorators to already existing column", () =>
            Promise.all(
                connections.map(async (connection) => {
                    await connection.runMigrations()
                    const queryRunner = connection.createQueryRunner()

                    await connection.synchronize()

                    const table = await queryRunner.getTable(
                        "user_two_properties",
                    )

                    await queryRunner.release()

                    const idUnique = table!.uniques[0].name
                    const emailUnique = table!.uniques[2].name
                    const emailUnique2 = table!.uniques[1].name

                    expect(table?.uniques.length).to.equal(3)
                    expect(idUnique).to.be.not.undefined
                    expect(idUnique).to.equal("id-unique")

                    expect(emailUnique).to.be.not.undefined
                    expect(emailUnique).to.equal("email-unique")

                    expect(emailUnique2).to.be.not.undefined
                    expect(emailUnique2).to.equal("email-unique2")
                }),
            ))
    })
})
