import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { StatusEnum } from "../enum/StatusEnum";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { constants } from "../error_messages";
@Entity("todo")
export class TodoEntity {
	@PrimaryGeneratedColumn()
	id: number;
	@Column()
	@MinLength(3, { message: constants.name_min_lenghth })
	@MaxLength(10)
	@IsNotEmpty()
	name: string;

	@Column()
	@MinLength(10, { message: constants.description_min_length })
	@IsNotEmpty({
		message: constants.description_obligatoire,
	})
	description: string;
	@CreateDateColumn({ update: false })
	createdAt: Date;

	@Column({ type: "enum", enum: StatusEnum })
	status: StatusEnum;
}
