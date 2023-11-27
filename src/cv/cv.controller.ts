import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Req,
} from "@nestjs/common";
import { CvService } from "./cv.service";
import { CreateCvDto } from "./dto/create-cv.dto";
import { UpdateCvDto } from "./dto/update-cv.dto";
import { Request } from "express";

@Controller("cv")
export class CvController {
	constructor(private readonly cvService: CvService) {}

	@Post()
	async create(@Body() createCvDto: CreateCvDto, @Req() req: Request) {
		return await this.cvService.create(createCvDto, req["userId"]);
	}

	@Get()
	async findAll() {
		return await this.cvService.findAll();
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		return await this.cvService.findOne(+id);
	}

	@Patch(":id")
	async update(
		@Param("id") id: string,
		@Body() updateCvDto: UpdateCvDto,
		@Req() req: Request,
	) {
		return await this.cvService.update(+id, updateCvDto, req["userId"]);
	}

	@Delete(":id")
	async remove(@Param("id") id: string) {
		return await this.cvService.remove(+id);
	}
}
