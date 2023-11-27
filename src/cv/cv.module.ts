import { Module } from "@nestjs/common";
import { CvService } from "./cv.service";
import { CvController } from "./cv.controller";
import { Cv } from "./entities/cv.entity";
import { Skill } from "../skill/entities/skill.entity";
import { User } from "../user/entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [TypeOrmModule.forFeature([Cv, Skill, User])],
	controllers: [CvController],
	providers: [CvService],
})
export class CvModule {}
