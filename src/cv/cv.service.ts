import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { CreateCvDto } from "./dto/create-cv.dto";
import { UpdateCvDto } from "./dto/update-cv.dto";
import { CrudService } from "../common/crud.service";
import { Cv } from "./entities/cv.entity";
import { DeepPartial, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Skill } from "../skill/entities/skill.entity";
import { User } from "../user/entities/user.entity";

@Injectable()
export class CvService extends CrudService<Cv> {
	constructor(
		@InjectRepository(Cv) private cvRepository: Repository<Cv>,
		@InjectRepository(Skill)
		private skillRepository: Repository<Skill>,
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) {
		super(cvRepository);
	}
	override async create(entity: CreateCvDto, id: number): Promise<Cv> {
		const { skills, ...cvData } = entity;
		const cv = await this.cvRepository.create(cvData);
		cv.skills = [];

		skills.forEach(async skill => {
			const s = await this.skillRepository.findOne({
				where: {
					designation: skill.designation,
				},
			});
			if (!s) {
				const newSkill = await this.skillRepository.save(skill);
				cv.skills.push(newSkill);
			} else cv.skills.push(s);
		});
		const user = await this.userRepository.findOne({ where: { id } });
		cv.user = user;
		return await super.create(cv);
	}

	async update(id: number, updateCvDto: UpdateCvDto, userId: number) {
		const cv = await this.findOne(id);
		if (!cv) throw new NotFoundException();

		if (cv.user?.id === userId) {
			const updatedCv = this.cvRepository.merge(cv, updateCvDto);

			return await this.cvRepository.save(updatedCv);
		} else
			return new UnauthorizedException("You don't have the right to update");
	}
	async addCvGivenACV(cv: Cv, user: User) {
		cv.user = user;
		return await this.cvRepository.save(cv);
	}
}
