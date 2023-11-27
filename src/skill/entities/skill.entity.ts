import { Cv } from "../../cv/entities/cv.entity";
import { Base } from "../../utils/base";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Skill extends Base {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	designation: string;

	@ManyToMany(() => Cv, cv => cv.skills)
	cvs: Cv[];
}
