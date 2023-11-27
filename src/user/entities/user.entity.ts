import { IsEmail, IsNotEmpty, isEmail } from "class-validator";
import { Cv } from "../../cv/entities/cv.entity";
import { Base } from "../../utils/base";
import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity("user")
export class User extends Base {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	username: string;

	@Column({ unique: true })
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@Column()
	password: string;

	@OneToMany(() => Cv, (cv: Cv) => cv.user)
	cvs: Cv[];
}
