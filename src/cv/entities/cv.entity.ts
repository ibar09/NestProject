import { IsNotEmpty } from "class-validator";
import { type } from "os";
import { Skill } from "../../skill/entities/skill.entity";
import { User } from "../../user/entities/user.entity";
import { Base } from "../../utils/base";
import {
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity("cv")
export class Cv extends Base {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@IsNotEmpty()
	name: string;

	@Column()
	@IsNotEmpty()
	firstname: string;

	@Column()
	@IsNotEmpty()
	age: number;

	@Column()
	cin: number;

	@Column()
	job: string;

	@Column()
	path: string;

	@ManyToOne(() => User, (user: User) => user.cvs, {
		eager: true,
		cascade: true,
	})
	user: User;
	@ManyToMany(() => Skill, skills => skills.cvs, { eager: true })
	@JoinTable()
	skills: Skill[];
}
