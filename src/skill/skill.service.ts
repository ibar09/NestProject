import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateSkillDto } from "./dto/create-skill.dto";
import { UpdateSkillDto } from "./dto/update-skill.dto";
import { CrudService } from "../common/crud.service";
import { Skill } from "./entities/skill.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class SkillService extends CrudService<Skill> {
	constructor(
		@InjectRepository(Skill) private skillRepository: Repository<Skill>,
	) {
		super(skillRepository);
	}

	async update(id: number, updatedSkillDto: UpdateSkillDto) {
		const skill = await this.findOne(id);
		if (!skill) return new NotFoundException("Skill not found");

		const updatedSkill = { updatedSkillDto, ...skill };
		return await this.skillRepository.update(id, updatedSkill);
	}
}
