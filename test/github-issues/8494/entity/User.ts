import { Column, Entity, PrimaryGeneratedColumn, Unique } from "../../../../src"

@Entity()
@Unique("email-unique", ["email"])
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string
}
