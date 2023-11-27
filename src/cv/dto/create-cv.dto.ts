import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateSkillDto } from "src/skill/dto/create-skill.dto";
import { Skill } from "src/skill/entities/skill.entity";

export class CreateCvDto {
	@IsString()
	@IsNotEmpty()
	name: string;
	@IsString()
	@IsNotEmpty()
	firstname: string;

	@IsNumber()
	@IsNotEmpty()
	age: number;

	@IsNumber()
	cin: number;

	@IsString()
	job: string;

	@IsString()
	path: string;

	@IsNotEmpty()
	@IsArray()
	skills: CreateSkillDto[];
}
