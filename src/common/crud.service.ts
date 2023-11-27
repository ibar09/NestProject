import { Injectable, NotFoundException } from "@nestjs/common";
import { DeepPartial, Repository } from "typeorm";
import { HasIdInterface } from "./has-id.interface";

@Injectable()
export class CrudService<T extends HasIdInterface> {
	constructor(private repository: Repository<T>) {}
	async create(entity: DeepPartial<T>, ...args) {
		return await this.repository.save(entity);
	}

	async findAll() {
		return await this.repository.find();
	}

	async findOne(id) {
		return await this.repository.findOne({ where: { id } });
	}
	async remove(id) {
		return await this.repository.delete(id);
	}
}
