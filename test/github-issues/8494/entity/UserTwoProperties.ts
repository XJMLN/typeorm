import { Column, Entity, PrimaryGeneratedColumn, Unique } from "../../../../src"

@Entity()
@Unique("email-unique", ["email"])
@Unique("email-unique2", ["email", "id"])
@Unique("id-unique", ["id"])
export class UserTwoProperties {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string
}
